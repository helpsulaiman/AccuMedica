'use client';

import { createProduct } from '@/actions/opt-products';
import { useState } from 'react';

const PLACEHOLDERS = [
    { label: 'Medicine Bottle', url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80' },
    { label: 'Medical Equipment', url: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=400&q=80' },
    { label: 'Pills', url: 'https://images.unsplash.com/photo-1550576313-0255860019f1?auto=format&fit=crop&w=400&q=80' },
    { label: 'Stethoscope', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80' },
];

export default function CreateProductPage() {
    const [usePlaceholder, setUsePlaceholder] = useState(true);
    const [selectedPlaceholder, setSelectedPlaceholder] = useState(PLACEHOLDERS[0].url);

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Create New Product</h1>

            <form action={createProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="name" style={{ fontWeight: 600 }}>Name</label>
                    <input
                        name="name"
                        id="name"
                        required
                        style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '0.25rem' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="description" style={{ fontWeight: 600 }}>Description</label>
                    <textarea
                        name="description"
                        id="description"
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
                        required
                        style={{ padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '0.25rem' }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="category" style={{ fontWeight: 600 }}>Category</label>
                    <select
                        name="category"
                        id="category"
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
                            value={selectedPlaceholder}
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
                    Create Product
                </button>
            </form>
        </div>
    );
}
