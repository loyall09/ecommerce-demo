"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import { products } from "@/lib/data"

type ChatMessage = {
  role: "user" | "assistant"
  reply: string
  recommended_slugs?: string[]
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to the latest message whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  async function handleSend() {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMessage: ChatMessage = { role: "user", reply: trimmed }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", reply: "Sorry, something went wrong. Please try again." },
        ])
        return
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", reply: data.reply, recommended_slugs: data.recommended_slugs },
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", reply: "Sorry, something went wrong. Please try again." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend()
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#3D5A44] text-white shadow-lg hover:bg-[#2f4736] transition-colors"
        aria-label="Open chat"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Slide-in panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[360px] flex-col rounded-2xl border border-[#3D5A44]/20 bg-[#FAF7F2] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-[#3D5A44] px-4 py-3 text-white">
            <h3 className="font-semibold">Book Assistant</h3>
            <p className="text-xs text-white/80">Ask me for a recommendation</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {/* Quick-action chips */}
{messages.length === 0 && (
  <div className="flex flex-wrap gap-2 px-4 pb-2">
    {["Under ₹500", "Mystery", "Fiction", "Surprise me"].map((label) => (
      <button
        key={label}
        onClick={() => {
          setInput(label === "Surprise me" ? "Recommend me something random" : `Recommend a book ${label === "Under ₹500" ? "under ₹500" : `in ${label}`}`)
        }}
        className="rounded-full border border-[#3D5A44]/30 bg-white px-3 py-1 text-xs text-[#3D5A44] hover:bg-[#3D5A44] hover:text-white transition-colors"
      >
        {label}
      </button>
    ))}
  </div>
)}
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-[#3D5A44] text-white"
                      : "bg-white border border-gray-200 text-gray-800"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <ReactMarkdown>{msg.reply}</ReactMarkdown>
                  ) : (
                    msg.reply
                  )}

                  {/* Recommended book cards */}
                  {msg.recommended_slugs && msg.recommended_slugs.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {msg.recommended_slugs.map((slug) => {
                        const book = products.find((p) => p.slug === slug)
                        if (!book) return null
                        return (
                          <Link
                            key={slug}
                            href={`/books/${book.slug}`}
                            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-[#FAF7F2] p-2 hover:bg-gray-100 transition-colors"
                          >
                            <div className="relative h-12 w-9 flex-shrink-0 overflow-hidden rounded">
                              <Image src={book.img} alt={book.name} fill className="object-cover" />
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-xs font-medium text-gray-800">{book.name}</p>
                              <p className="text-xs text-[#3D5A44]">₹{book.price}</p>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-xl border border-gray-200 bg-white px-3 py-2">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-gray-200 p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask for a recommendation..."
              disabled={isLoading}
              className="flex-1 rounded-full border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-[#3D5A44]"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="rounded-full bg-[#3D5A44] px-4 py-2 text-sm text-white disabled:opacity-40"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  )
}