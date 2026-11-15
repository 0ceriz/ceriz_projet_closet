import { pool } from "../db/db_connect";
import {
  Closet,
  ClosetId,
  CreateClosetRepositoryData,
  UpdateClosetRepositoryData,
} from "../types/closet.types";
import { mapClosetDbToCloset } from "../mappers/closet.mapper";
import type { ClosetDb } from "../mappers/closet.mapper";

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

  const result = await pool.query<ClosetDb>(query);
  return result.rows.map((row: ClosetDb) => mapClosetDbToCloset(row));
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

  const result = await pool.query<ClosetDb>(query, [id]);
  const closet = result.rows[0];
  return closet ? mapClosetDbToCloset(closet) : null;
};

const findByNameAndUserId = async (
  name: string,
  userId: string,
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
    WHERE name = $1
      AND user_id = $2;
  `;

  const result = await pool.query<ClosetDb>(query, [name, userId]);
  const closet = result.rows[0];
  return closet ? mapClosetDbToCloset(closet) : null;
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

  const result = await pool.query<ClosetDb>(query, values);
  const closet = result.rows[0];

  if (!closet) {
    throw new Error("The database did not return the created closet");
  }

  return mapClosetDbToCloset(closet);
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

  const result = await pool.query<ClosetDb>(query, [userId]);
  return result.rows.map((row: ClosetDb) => mapClosetDbToCloset(row));
};

const updateById = async (
  id: ClosetId,
  data: UpdateClosetRepositoryData,
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

  const result = await pool.query<ClosetDb>(query, values);
  const closet = result.rows[0];
  return closet ? mapClosetDbToCloset(closet) : null;
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
