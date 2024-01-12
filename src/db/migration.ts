import 'dotenv/config';

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const main = async () => {
  console.log('Migration started');
  const client = postgres({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 1,
  });

  await migrate(drizzle(client), { migrationsFolder: 'drizzle' });
  console.log('Migration finished');
  process.exit(0);
};

main().catch(err => {
  console.log(err);
  process.exit(0);
});
