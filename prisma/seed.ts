import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: ['.env.local', '.env'] });

const libsql = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN
});

const adapter = new PrismaLibSQL(libsql);

console.log('Adapter created:', adapter ? 'Yes' : 'No');

// Workaround: Pass a dummy URL to satisfy Prisma validation if it misses the schema URL
const prisma = new PrismaClient({
    adapter,
});

async function main() {
    const email = 'admin@accumedica.com';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            password: hashedPassword,
            name: 'Admin User'
        },
    });

    console.log({ user });

    const products = [
        {
            id: 'hospital-bed-advanced',
            category: 'furniture',
            image: 'bg-blue-100',
            name: 'hospital-bed-advanced',
            description: 'hospital-bed-advanced',
            price: 1200.00
        },
        {
            id: 'digital-stethoscope',
            category: 'diagnostics',
            image: 'bg-teal-100',
            name: 'digital-stethoscope',
            description: 'digital-stethoscope',
            price: 150.00
        },
        {
            id: 'surgical-mask-pro',
            category: 'consumables',
            image: 'bg-indigo-100',
            name: 'surgical-mask-pro',
            description: 'surgical-mask-pro',
            price: 15.00
        },
        {
            id: 'vital-monitor-x1',
            category: 'equipment',
            image: 'bg-red-100',
            name: 'vital-monitor-x1',
            description: 'vital-monitor-x1',
            price: 3500.00
        },
        {
            id: 'wheelchair-ergonomic',
            category: 'mobility',
            image: 'bg-green-100',
            name: 'wheelchair-ergonomic',
            description: 'wheelchair-ergonomic',
            price: 450.00
        },
        {
            id: 'infusion-pump-auto',
            category: 'equipment',
            image: 'bg-purple-100',
            name: 'infusion-pump-auto',
            description: 'infusion-pump-auto',
            price: 850.00
        }
    ];

    for (const product of products) {
        await prisma.product.upsert({
            where: { id: product.id },
            update: {},
            create: product,
        })
    }
    console.log(`Seeded ${products.length} products`);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
