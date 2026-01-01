require('dotenv').config({ path: ['.env.local', '.env'] })
const { createClient } = require('@libsql/client')

async function main() {
    console.log('Connecting to LibSQL...')
    const libsql = createClient({
        url: process.env.DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN
    })

    console.log('Starting migration to add Order tables...')

    // Create Order table
    const createOrderTable = `
        CREATE TABLE IF NOT EXISTS "Order" (
            "id" TEXT NOT NULL PRIMARY KEY,
            "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "status" TEXT NOT NULL DEFAULT 'PENDING',
            "total" REAL NOT NULL
        );
    `

    // Create OrderItem table
    const createOrderItemTable = `
        CREATE TABLE IF NOT EXISTS "OrderItem" (
            "id" TEXT NOT NULL PRIMARY KEY,
            "orderId" TEXT NOT NULL,
            "productId" TEXT NOT NULL,
            "quantity" INTEGER NOT NULL,
            "price" REAL NOT NULL,
            CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE,
            CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
        );
    `

    // Create Indexes
    const indexOrderItemsOrder = `CREATE INDEX IF NOT EXISTS "OrderItem_orderId_idx" ON "OrderItem"("orderId");`
    const indexOrderItemsProduct = `CREATE INDEX IF NOT EXISTS "OrderItem_productId_idx" ON "OrderItem"("productId");`

    try {
        console.log('Creating Order table...')
        await libsql.execute(createOrderTable)

        console.log('Creating OrderItem table...')
        await libsql.execute(createOrderItemTable)

        console.log('Creating indexes...')
        await libsql.execute(indexOrderItemsOrder)
        await libsql.execute(indexOrderItemsProduct)

        console.log('Migration completed successfully.')
    } catch (e) {
        console.error('Migration failed:', e)
        process.exit(1)
    }
}

main()
