import { pool } from '../db/db_connect';
import {
  Closet,
  ClosetId,
  CreateClosetRepositoryData,
  UpdateClosetRepositoryData,
} from '../types/closet.types';

const findAll = async (): Promise<Closet[]> => {
  const query = `
    SELECT
      id,
      user_id,
      name,
      description,
      created_at,
      updated_at
    FROM closet
    ORDER BY created_at DESC;
  `;

  const result = await pool.query<Closet>(query);
  return result.rows;
};

const findById = async (id: ClosetId): Promise<Closet | null> => {
  const query = `
    SELECT
      id,
      user_id,
      name,
      description,
      created_at,
      updated_at
    FROM closet
    WHERE id = $1;
  `;

  const result = await pool.query<Closet>(query, [id]);
  return result.rows[0] ?? null;
};

const findByNameAndUserId = async (
  name: string,
  userId: string
): Promise<Closet | null> => {
  const query = `
    SELECT
      id,
      user_id,
      name,
      description,
      created_at,
      updated_at
    FROM closet
    WHERE name = $1;
  `;

  const result = await pool.query<Closet>(query, [name, userId]);
  return result.rows[0] ?? null;
};

const create = async (data: CreateClosetRepositoryData): Promise<Closet> => {
  const query = `
    INSERT INTO closet (
      user_id,
      name,
      description
    )
    VALUES ($1, $2, $3)
    RETURNING
      id,
      user_id,
      name,
      description,
      created_at,
      updated_at;
  `;

  const values = [data.user_id, data.name, data.description ?? null];

  const result = await pool.query<Closet>(query, values);

  return result.rows[0]!;
};

const deleteById = async (id: ClosetId): Promise<boolean> => {
  const query = `
    DELETE FROM closet
    WHERE id = $1;
  `;

  const result = await pool.query(query, [id]);

  return result.rowCount === 1;
};

const findByUserId = async (userId: string): Promise<Closet[]> => {
  const query = `
    SELECT
      id,
      name,
      description,
      user_id,
      created_at,
      updated_at
    FROM closet
    WHERE user_id = $1
    ORDER BY created_at DESC;
  `;

  const result = await pool.query<Closet>(query, [userId]);
  return result.rows;
};

const updateById = async (
  id: ClosetId,
  data: UpdateClosetRepositoryData
): Promise<Closet | null> => {
  //COALESCE permet de garder la valeur actuelle si la nouvelle valeur est null
  const query = `
    UPDATE closet
    SET
      name = COALESCE($2, name), 
      description = COALESCE($3, description),
      updated_at = NOW()
    WHERE id = $1
    RETURNING
      id,
      user_id,
      name,
      description,
      created_at,
      updated_at;
  `;

  const values = [id, data.name ?? null, data.description ?? null];

  const result = await pool.query<Closet>(query, values);

  return result.rows[0] ?? null;
};

export const closetRepository = {
  findAll,
  findById,
  findByNameAndUserId,
  create,
  deleteById,
  findByUserId,
  updateById,
};
