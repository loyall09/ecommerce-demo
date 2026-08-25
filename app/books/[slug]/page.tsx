type Props = {
    params: {
        slug: string
    }
    searchParams: {
        category?: string
    }
}

async function BooksPage({ params, searchParams }: Props) {
    const { slug } = await params
    const { category } = await searchParams
    
    return (
        <div>
            Slug: {slug}, Category: {category}
        </div>
    )
}
export default BooksPage