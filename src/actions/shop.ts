'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { CartItem } from '@/context/CartContext';

export async function placeOrder(items: CartItem[], total: number, customerDetails: {
    name: string;
    email: string;
    address: string;
    paymentMethod: string;
}) {
    if (!items || items.length === 0) {
        return { error: 'Cart is empty' };
    }

    try {
        // Create the order and related items in a transaction (implicitly via nested create)
        const order = await prisma.order.create({
            data: {
                total,
                status: 'PENDING',
                customerName: customerDetails.name,
                customerEmail: customerDetails.email,
                address: customerDetails.address,
                paymentMethod: customerDetails.paymentMethod,
                items: {
                    create: items.map(item => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        });

        console.log('Order created:', order.id);

        const locale = await getLocale();
        // Return success so client can clear cart and redirect
        return { success: true, orderId: order.id };

    } catch (error: any) {
        console.error('Failed to place order:', error);
        return {
            error: `Failed to place order: ${error.message || JSON.stringify(error)}`,
            debug: process.env.NODE_ENV === 'development' ? error.stack : undefined
        };
    }
}
