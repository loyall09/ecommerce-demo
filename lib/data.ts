export type Product = {
    slug: string
    name: string
    description: string
    price: number
    category: string
    img: string 
}

export const products: Product[] = [
    {
        slug: "great-gatsby",
        name: 'The Great Gatsby',
        description: 'A tragic story of wealth, love, and obsession in 1920s New York.',
        price: 10.99,
        category: 'Fiction',
        img: "/img2.jpg"
    },
    {
        slug: "to-kill-a-mockingbird",
        name: 'To Kill a Mockingbird',
        description: 'A powerful story of racial injustice seen through a child\'s eyes in the American South.',
        price: 12.99,
        category: 'Fiction',
        img: "/img3.jpg"
    },
    {
        slug: "1984",
        name: '1984',
        description: 'A dystopian novel about surveillance, propaganda, and a totalitarian regime.',
        price: 9.99,
        category: 'Fiction',
        img: "/img4.jpg"
    },
    {
        slug: "catcher-in-the-rye",
        name: 'The Catcher in the Rye',
        description: 'A restless teenager wanders New York City, questioning the world around him.',
        price: 11.99,
        category: 'Fiction',
        img: "/img5.jpg"
    },
    {
        slug: "sapiens",
        name: 'Sapiens: A Brief History of Humankind',
        description: 'A sweeping look at how Homo sapiens came to dominate the world.',
        price: 14.99,
        category: 'Non-Fiction',
        img: "/img2.jpg"
    },
    {
        slug: "atomic-habits",
        name: 'Atomic Habits',
        description: 'A practical guide to building good habits and breaking bad ones.',
        price: 13.99,
        category: 'Self-Help',
        img: "/img3.jpg"
    },
    {
        slug: "gone-girl",
        name: 'Gone Girl',
        description: 'A psychological thriller about a marriage gone dangerously wrong.',
        price: 11.49,
        category: 'Mystery',
        img: "/img3.jpg"
    },
    {
        slug: "silent-patient",
        name: 'The Silent Patient',
        description: 'A woman shoots her husband and then never speaks again — a gripping psychological mystery.',
        price: 12.49,
        category: 'Mystery',
        img: "/img4.jpg"
    },
    {
        slug: "english-dictionary",
        name: 'Oxford English Dictionary',
        description: 'A comprehensive reference guide to English vocabulary, spelling, and meaning.',
        price: 8.99,
        category: 'Reference',
        img: "/img5.jpg"
    },
    {
        slug: "world-atlas",
        name: 'World Atlas',
        description: 'A detailed collection of maps covering countries, terrain, and geography.',
        price: 15.99,
        category: 'Reference',
        img: "/img2.jpg"
    },
    {
        slug: "cosmos",
        name: 'Cosmos',
        description: 'An accessible journey through astronomy, science, and the history of the universe.',
        price: 13.49,
        category: 'Non-Fiction',
        img: "/img3.jpg"
    },
    {
        slug: "harry-potter-1",
        name: 'Harry Potter and the Sorcerer\'s Stone',
        description: 'A young boy discovers he is a wizard and begins his journey at a magical school.',
        price: 10.49,
        category: 'Fantasy',
        img: "/img4.jpg"
    },
]