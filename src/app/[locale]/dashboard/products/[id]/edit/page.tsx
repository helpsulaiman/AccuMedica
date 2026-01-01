import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { EditProductForm } from '@/components/EditProductForm';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await prisma.product.findUnique({
        where: { id },
    });

    if (!product) {
        notFound();
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Edit Product</h1>
            <EditProductForm product={product} />
        </div>
    );
}
