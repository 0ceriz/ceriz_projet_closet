import { pool } from '../db/db_connect';
import { CreateRevokedTokenRepositoryData } from '../types/revokedToken.types';

const create = async (
  data: CreateRevokedTokenRepositoryData
): Promise<void> => {
  const query = `
    INSERT INTO revoked_token (
      token,
      expires_at
    )
    VALUES ($1, $2);
  `;

  await pool.query(query, [data.token, data.expiresAt]);
};

const findByToken = async (token: string): Promise<boolean> => {
  const query = `
    SELECT 1
    FROM revoked_token
    WHERE token = $1;
  `;

  const result = await pool.query(query, [token]);

  return result.rowCount === 1;
};

const deleteExpired = async (): Promise<void> => {
  const query = `
    DELETE FROM revoked_token
    WHERE expires_at < NOW();
  `;

  await pool.query(query);
};

export const revokedTokenRepository = {
  create,
  findByToken,
  deleteExpired,
};
