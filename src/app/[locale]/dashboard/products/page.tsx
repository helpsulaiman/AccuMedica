import { prisma } from '@/lib/prisma';
import { Link } from '@/i18n/routing';
import { Product } from '@prisma/client';
import DeleteProductButton from '@/components/DeleteProductButton';

export const dynamic = 'force-dynamic';

export default async function ProductsDashboardPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem' }}>Products</h1>
                <Link
                    href="/dashboard/products/create"
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '0.25rem',
                        fontWeight: 'bold'
                    }}
                >
                    Add Product
                </Link>
            </div>

            <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: '0.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid var(--border)' }}>
                        <tr>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Name</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Category</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Price</th>
                            <th style={{ padding: '1rem', fontWeight: '600' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product: Product) => (
                            <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem' }}>{product.name}</td>
                                <td style={{ padding: '1rem' }}>{product.category}</td>
                                <td style={{ padding: '1rem' }}>${product.price?.toFixed(2)}</td>
                                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                    <Link
                                        href={`/dashboard/products/${product.id}/edit`}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            backgroundColor: '#f0f0f0',
                                            color: '#333',
                                            textDecoration: 'none',
                                            borderRadius: '0.25rem',
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        Edit
                                    </Link>
                                    <DeleteProductButton productId={product.id} />
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
