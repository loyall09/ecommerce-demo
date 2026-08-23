export type Product = {
    id: number
    name: string
    description: string
    price: number
    category: string
}

export const products: Product[] = [
    {
        id: 1,
        name: 'The Great Gatsby',
        description: 'A novel by F. Scott Fitzgerald',  
        price: 10.99,
        category: 'Fiction'
    },
    {
        id: 2,
        name: 'To Kill a Mockingbird',
        description: 'A novel by Harper Lee',
        price: 12.99,
        category: 'Fiction'
    },
    {
        id: 3,
        name: '1984',
        description: 'fireWings',
        price: 9.99,
        category: 'Non-Fiction'
    },
    {
        id: 4,
        name: 'R.D Shridhar',
        description: 'A novel by J.D. Salinger',
        price: 11.99,
        category: 'Informtion'
    },
    {
        id: 5,
        name: 'Dictionary',
        description: 'A novel by J.D. Salinger',
        price: 8.99,
        category: 'guide'
    }
]