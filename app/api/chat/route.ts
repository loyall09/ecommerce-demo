import { NextRequest, NextResponse } from "next/server"
import { products } from "@/lib/data"

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    console.log("KEY LENGTH:", process.env.GEMINI_API_KEY?.length)
console.log("KEY PREFIX:", process.env.GEMINI_API_KEY?.slice(0, 6))

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Only send the fields Gemini actually needs to recommend —
    // keeps the prompt smaller and avoids leaking unrelated data
    const catalog = products.map((p) => ({
      slug: p.slug,
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
    }))

    const systemPrompt = `You are a helpful book shop assistant for an online bookstore.

You can ONLY discuss and recommend books from the CATALOG below. Never invent, assume, or reference any book that isn't in this list.

CATALOG:
${JSON.stringify(catalog)}

You can do two things:
1. Recommend books based on what the user is looking for (genre, price, mood, etc.)
2. Answer questions about a SPECIFIC book already in the catalog (e.g. "tell me about Gone Girl", "how much is 1984", "what's the Catcher in the Rye about")

Respond ONLY with valid JSON in this exact shape, and nothing else — no markdown fences, no preamble:
{
  "reply": "a short friendly reply, markdown allowed for bold/lists",
  "recommended_slugs": ["slug-1", "slug-2"]
}

Rules:
- "recommended_slugs" must only contain slugs that exist in the CATALOG above.
- If the user asks about a specific book, put that book's slug in "recommended_slugs" so its card shows, and answer their question in "reply" using only the catalog description.
- If nothing in the catalog matches the request, return an empty array for "recommended_slugs" and explain that in "reply".
- Recommend at most 3 books at a time.`

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY!,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\nUser message: ${message}` }],
            },
          ],
          generationConfig: {
            thinkingConfig: { thinkingLevel: "LOW" },
            maxOutputTokens: 1000,
          },
        }),
      }
    )

    if (!response.ok) {
      const errText = await response.text()
      console.error("Gemini API error:", errText)
      return NextResponse.json({ error: "AI service failed" }, { status: 502 })
    }

    const data = await response.json()
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!rawText) {
      return NextResponse.json({ error: "Empty AI response" }, { status: 502 })
    }

    // Gemini sometimes wraps JSON in ```json fences even when told not to —
    // strip them before parsing so JSON.parse doesn't throw
    const cleaned = rawText.replace(/```json|```/g, "").trim()

    let parsed
    try {
      parsed = JSON.parse(cleaned)
    } catch (e) {
      console.error("Failed to parse Gemini JSON:", cleaned)
      return NextResponse.json({ error: "AI returned invalid format" }, { status: 502 })
    }

    // Extra safety: filter recommended_slugs down to slugs that actually exist,
    // in case Gemini hallucinates one despite instructions
    const validSlugs = new Set(products.map((p) => p.slug))
    const safeSlugs = (parsed.recommended_slugs || []).filter((s: string) => validSlugs.has(s))

    return NextResponse.json({
      reply: parsed.reply || "",
      recommended_slugs: safeSlugs,
    })
  } catch (err) {
    console.error("Chat route error:", err)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}