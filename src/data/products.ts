export interface Product {
    id: string;
    category: string;
    image: string; // Placeholder color or path
}

export const products: Product[] = [
    {
        id: 'hospital-bed-advanced',
        category: 'furniture',
        image: 'bg-blue-100', // Using generic classes for placeholders for now
    },
    {
        id: 'digital-stethoscope',
        category: 'diagnostics',
        image: 'bg-teal-100',
    },
    {
        id: 'surgical-mask-pro',
        category: 'consumables',
        image: 'bg-indigo-100',
    },
    {
        id: 'vital-monitor-x1',
        category: 'equipment',
        image: 'bg-red-100',
    },
    {
        id: 'wheelchair-ergonomic',
        category: 'mobility',
        image: 'bg-green-100',
    },
    {
        id: 'infusion-pump-auto',
        category: 'equipment',
        image: 'bg-purple-100',
    }
];
