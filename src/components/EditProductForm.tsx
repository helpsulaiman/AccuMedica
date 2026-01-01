'use client';

import { updateProduct } from '@/actions/opt-products';
import { useState } from 'react';

const PLACEHOLDERS = [
    { label: 'Medicine Bottle', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80' },
    { label: 'Medical Equipment', url: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=400&q=80' },
    { label: 'Pills', url: 'https://images.unsplash.com/photo-1550576313-0255860019f1?auto=format&fit=crop&w=400&q=80' },
    { label: 'Stethoscope', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80' },
];

// Note: In Next.js 15+, we should generally treat params as a promise, 
// but since this is a Client Component now (due to 'use client'), 
// we typically accept serialized props passed from a Server Component parent,
// OR if using it as a page directly, params are available.
// However, direct DB access (prisma) is NOT allowed in Client Components.
// We must separate the data fetching (Server parent) from the form (Client child).

// Let's refactor the page to be a Server Component that fetches data, 
// and renders a Client Form component.

// TEMPORARY: Since I am overwriting the file, I will split this into two parts in my head but I need to write 2 files.
// 1. EditProductForm (client)
// 2. Page (server)

// But wait, the user current file is a server component. I cannot just add 'use client' AND keep prisma calls.
// I will create `EditProductForm.tsx` first, then update `page.tsx`.

// For this specific tool call, I will create the CLIENT FORM component first.
import { Product } from '@prisma/client';

export function EditProductForm({ product }: { product: Product }) {
    // Determine if current image matches a placeholder
    const isPlaceholder = !product.image || PLACEHOLDERS.some(p => p.url === product.image);
    const [usePlaceholder, setUsePlaceholder] = useState(isPlaceholder);
    const [selectedPlaceholder, setSelectedPlaceholder] = useState(
        (isPlaceholder && product.image) ? product.image : PLACEHOLDERS[0].url
    );
    const [customUrl, setCustomUrl] = useState(!isPlaceholder ? (product.image || '') : '');

    const updateProductWithId = updateProduct.bind(null, product.id);

    return (
        <form action={updateProductWithId} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="name" style={{ fontWeight: 600 }}>Name</label>
                <input
                    name="name"
                    id="name"
                    defaultValue={product.name}
                    required
                    style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '0.25rem' }}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="description" style={{ fontWeight: 600 }}>Description</label>
                <textarea
                    name="description"
                    id="description"
                    defaultValue={product.description}
                    required
                    rows={4}
                    style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '0.25rem', fontFamily: 'inherit' }}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="price" style={{ fontWeight: 600 }}>Price</label>
                <input
                    type="number"
                    step="0.01"
                    name="price"
                    id="price"
                    defaultValue={product.price || ''}
                    required
                    style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '0.25rem' }}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="category" style={{ fontWeight: 600 }}>Category</label>
                <select
                    name="category"
                    id="category"
                    defaultValue={product.category}
                    required
                    style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '0.25rem' }}
                >
                    <option value="">Select a category</option>
                    <option value="Supplements">Supplements</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Personal Care">Personal Care</option>
                </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontWeight: 600 }}>Product Image</label>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="radio"
                            checked={usePlaceholder}
                            onChange={() => setUsePlaceholder(true)}
                        />
                        Use Placeholder
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="radio"
                            checked={!usePlaceholder}
                            onChange={() => setUsePlaceholder(false)}
                        />
                        Custom URL
                    </label>
                </div>

                {usePlaceholder ? (
                    <select
                        name="image"
                        id="image"
                        value={selectedPlaceholder || ''}
                        onChange={(e) => setSelectedPlaceholder(e.target.value)}
                        style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '0.25rem' }}
                    >
                        {PLACEHOLDERS.map((p) => (
                            <option key={p.url} value={p.url}>{p.label}</option>
                        ))}
                    </select>
                ) : (
                    <input
                        type="url"
                        name="image"
                        id="image"
                        value={customUrl}
                        onChange={(e) => setCustomUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '0.25rem' }}
                    />
                )}
            </div>

            <button
                type="submit"
                style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    backgroundColor: 'var(--primary-color)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}
            >
                Update Product
            </button>
        </form>
    );
}
