import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from '@/db/schema';

declare global {
  var drizzle: postgres.Sql<{}> | undefined;
}

const createNewClient = () => {
  const client = postgres({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  return client;
};

const client = globalThis.drizzle ? globalThis.drizzle : createNewClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.drizzle = client;
}

// Can only use db in server components
export const db = drizzle(client, { schema });
