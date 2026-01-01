require('dotenv').config({ path: ['.env.local', '.env'] })
const { createClient } = require('@libsql/client')
const bcrypt = require('bcryptjs')

async function main() {
    console.log('Connecting to LibSQL...')
    const libsql = createClient({
        url: process.env.DATABASE_URL,
        authToken: process.env.TURSO_AUTH_TOKEN
    })

    const email = 'admin@accumedica.com'
    const password = 'password123'
    const hashedPassword = await bcrypt.hash(password, 10)
    const id = 'admin-user-id'
    const name = 'Admin User'
    const now = new Date().toISOString() // SQLite expects ISO string or integer

    console.log('Seeding admin user...')

    // SQLite upsert syntax: INSERT INTO ... ON CONFLICT(email) DO UPDATE SET ...
    const statement = {
        sql: `INSERT INTO "User" (id, email, password, name, createdAt, updatedAt) 
              VALUES (?, ?, ?, ?, ?, ?)
              ON CONFLICT(email) DO UPDATE SET 
                password = excluded.password,
                name = excluded.name,
                updatedAt = excluded.updatedAt`,
        args: [id, email, hashedPassword, name, now, now]
    }

    try {
        await libsql.execute(statement)
        console.log('Admin user seeded successfully.')
    } catch (e) {
        console.error('Seeding failed:', e)
        process.exit(1)
    }
}

main()
