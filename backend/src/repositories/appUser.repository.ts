import { pool } from '../db/db_connect';
import { AppUserDb } from '../types/appUser.types';

const findAll = async (): Promise<AppUserDb[]> => {
  const query = `
    SELECT
      id,
      pseudo,
      email,
      password_hash,
      picture_url,
      created_at,
      updated_at
    FROM app_user
    ORDER BY created_at DESC;
  `;
  const result = await pool.query<AppUserDb>(query);
  return result.rows;
};

export const appUserRepository = {
  findAll,
};
