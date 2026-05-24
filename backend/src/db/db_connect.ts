import { Pool } from 'pg';
import { env } from '../config/env';

export const pool = new Pool({
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle PostgreSQL client:', err);
});

export async function closePool(): Promise<void> {
  try {
    await pool.end();
    console.log('✅ PostgreSQL connection pool closed');
  } catch (err) {
    console.error('❌ Error closing PostgreSQL connection pool:', err);
  }
}
