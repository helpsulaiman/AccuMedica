require('dotenv').config()
const { createClient } = require('@libsql/client')

async function main() {
    console.log('Connecting to LibSQL...')
    const libsql = createClient({
        url: process.env.DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN
    })

    console.log('Starting migration to add User table...')

    const statement = `
        CREATE TABLE IF NOT EXISTS "User" (
            "id" TEXT NOT NULL PRIMARY KEY,
            "email" TEXT NOT NULL,
            "password" TEXT NOT NULL,
            "name" TEXT,
            "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" DATETIME NOT NULL
        );
    `

    const indexStatement = `CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");`

    try {
        console.log('Creating User table...')
        await libsql.execute(statement)
        console.log('Creating unique index on email...')
        await libsql.execute(indexStatement)
        console.log('Migration completed successfully.')
    } catch (e) {
        console.error('Migration failed:', e)
        process.exit(1)
    }
}

main()
