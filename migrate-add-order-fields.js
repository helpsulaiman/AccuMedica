const { createClient } = require('@libsql/client');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const db = createClient({
    url: process.env.DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

async function main() {
    console.log('Adding customer fields to Order table...');
    try {
        await db.execute(`
      ALTER TABLE "Order" ADD COLUMN "customerName" TEXT NOT NULL DEFAULT '';
    `);
        await db.execute(`
      ALTER TABLE "Order" ADD COLUMN "customerEmail" TEXT NOT NULL DEFAULT '';
    `);
        await db.execute(`
      ALTER TABLE "Order" ADD COLUMN "address" TEXT NOT NULL DEFAULT '';
    `);
        await db.execute(`
       ALTER TABLE "Order" ADD COLUMN "paymentMethod" TEXT NOT NULL DEFAULT 'COD';
    `);

        console.log('Successfully added columns (customerName, customerEmail, address, paymentMethod) to Order table.');
    } catch (e) {
        if (e.message.includes('duplicate column name')) {
            console.log('Columns likely already exist, skipping.');
        } else {
            console.error('Error adding columns:', e);
        }
    }
}

main();
