
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
// Also try local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function main() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        console.log('No DATABASE_URL');
        return;
    }

    const httpUrl = connectionString.replace('libsql://', 'https://');
    console.log('Fetching:', httpUrl);

    try {
        const res = await fetch(httpUrl);
        console.log('Status:', res.status);
        console.log('Text:', await res.text());
    } catch (e) {
        console.error('Fetch Failed:', e);
    }
}

main();
