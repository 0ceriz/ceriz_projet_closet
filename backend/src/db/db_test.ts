// note : run the command “npx ts-node src/db/db_test.ts” to test the connection to the database
// Dans le .env, et juste pour le test, il faut que host soit l'adresse url du container et que le port utilisé soit exposé

import { closePool, pool } from './db_connect';

interface TimeRow {
  current_time: Date;
}

const testConnection = async (): Promise<void> => {
  try {
    const client = await pool.connect();
    const result = await client.query<TimeRow>('SELECT NOW() AS current_time');
    console.log('✅ Connected to the database successfully!');
    console.log(
      `🕒 Database time: ${result.rows[0]?.current_time.toISOString()}`
    );
    client.release();
  } catch (error) {
    console.error('❌ Error connecting to the database:', error);
  } finally {
    await closePool();
  }
};

testConnection()
  .then(() => console.log('✅ Connection test complete'))
  .catch((error) => {
    console.error('❌ Unexpected error during connection test:', error);
  });
