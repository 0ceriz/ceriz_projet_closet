import { pool } from '../db/db_connect';
import {
  AppUserDb,
  AppUserId,
  CreateAppUserRepositoryData,
  UpdateAppUserRepositoryData,
} from '../types/appUser.types';

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

const findById = async (id: AppUserId): Promise<AppUserDb | null> => {
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
    WHERE id = $1
  `;
  const value = [id];
  const result = await pool.query<AppUserDb>(query, value);
  return result.rows[0] ?? null;
};

const findByEmail = async (email: string): Promise<AppUserDb | null> => {
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
    WHERE email = $1
  `;
  const value = [email];
  const result = await pool.query<AppUserDb>(query, value);
  return result.rows[0] ?? null;
};

const findByPseudo = async (pseudo: string): Promise<AppUserDb | null> => {
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
    WHERE pseudo = $1
  `;
  const value = [pseudo];
  const result = await pool.query<AppUserDb>(query, value);
  return result.rows[0] ?? null;
};

const create = async (
  data: CreateAppUserRepositoryData
): Promise<AppUserDb> => {
  const query = `
    INSERT INTO app_user (
      pseudo,
      email,
      password_hash,
      picture_url
    )
    VALUES ($1, $2, $3, $4)
    RETURNING
      id,
      pseudo,
      email,
      password_hash,
      picture_url,
      created_at,
      updated_at;
  `;
  const values = [
    data.pseudo,
    data.email,
    data.passwordHash,
    data.pictureUrl ?? null,
  ];
  const result = await pool.query<AppUserDb>(query, values);
  return result.rows[0]!;
};

const updateById = async (
  id: AppUserId,
  data: UpdateAppUserRepositoryData
): Promise<AppUserDb | null> => {
  const fieldsToUpdate: string[] = [];
  const values: unknown[] = [];
  let paramIndex = 1;

  if (data.pseudo !== undefined) {
    fieldsToUpdate.push('pseudo = $' + paramIndex);
    values.push(data.pseudo);
    paramIndex++;
  }
  if (data.email !== undefined) {
    fieldsToUpdate.push('email = $' + paramIndex);
    values.push(data.email);
    paramIndex++;
  }
  if (data.passwordHash !== undefined) {
    fieldsToUpdate.push('password_hash = $' + paramIndex);
    values.push(data.passwordHash);
    paramIndex++;
  }
  if (data.pictureUrl !== undefined) {
    fieldsToUpdate.push('picture_url = $' + paramIndex);
    values.push(data.pictureUrl);
    paramIndex++;
  }
  if (fieldsToUpdate.length === 0) return findById(id);
  fieldsToUpdate.push('updated_at = NOW()');
  values.push(id);

  const query = `
    UPDATE app_user
    SET
      ${fieldsToUpdate.join(', ')}
    WHERE id = $${paramIndex}
    RETURNING
      id,
      pseudo,
      email,
      password_hash,
      picture_url,
      created_at,
      updated_at;
  `;
  const result = await pool.query<AppUserDb>(query, values);
  return result.rows[0] ?? null;
};

const deleteById = async (id: AppUserId): Promise<boolean> => {
  const query = `
    DELETE FROM app_user
    WHERE id = $1
  `;
  const result = await pool.query<AppUserDb>(query, [id]);
  return result.rowCount === 1;
};

export const appUserRepository = {
  findAll,
  findById,
  findByEmail,
  findByPseudo,
  create,
  deleteById,
  updateById,
};
