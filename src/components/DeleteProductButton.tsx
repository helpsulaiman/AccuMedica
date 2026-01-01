'use client';

import { deleteProduct } from '@/actions/opt-products';

export default function DeleteProductButton({ productId }: { productId: string }) {
    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(productId);
        }
    };

    return (
        <form onSubmit={handleDelete}>
            <button
                type="submit"
                style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                }}
            >
                Delete
            </button>
        </form>
    );
}
