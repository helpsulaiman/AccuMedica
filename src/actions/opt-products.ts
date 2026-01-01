'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';

export async function createProduct(formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    // Allow empty string to be null
    const image = (formData.get('image') as string) || null;

    await prisma.product.create({
        data: {
            id: crypto.randomUUID(),
            name,
            description,
            price,
            category,
            image,
            updatedAt: new Date(),
        },
    });

    revalidatePath('/products');
    revalidatePath('/dashboard/products');
    const locale = await getLocale();
    redirect(`/${locale}/dashboard/products`);
}

export async function updateProduct(id: string, formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const image = (formData.get('image') as string) || null;

    await prisma.product.update({
        where: { id },
        data: {
            name,
            description,
            price,
            category,
            image,
            updatedAt: new Date(),
        },
    });


    revalidatePath('/products');
    revalidatePath('/dashboard/products');
    const locale = await getLocale();
    redirect(`/${locale}/dashboard/products`);
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({
        where: { id },
    });

    revalidatePath('/products');
    revalidatePath('/dashboard/products');
}
