import { api } from "../api/axios";
import type { Closet } from "../types/closet.types";

export interface CreateClosetData {
  name: string;
  description?: string;
}

export interface UpdateClosetData {
  name?: string;
  description?: string;
}

export const closetApi = {
  async getMyClosets(): Promise<Closet[]> {

    const response =
      await api.get("/closet/me");

    return response.data;

  },

  async getById(
    id: string
  ): Promise<Closet> {

    const response =
      await api.get(`/closet/${id}`);

    return response.data;

  },

  async create(
    data: CreateClosetData
  ): Promise<Closet> {

    const response =
      await api.post(
        "/closet",
        data
      );

    return response.data;

  },

  async update(
    id: string,
    data: UpdateClosetData
  ): Promise<Closet> {

    const response =
      await api.patch(
        `/closet/${id}`,
        data
      );

    return response.data;

  },

  async remove(
    id: string
  ): Promise<void> {

    await api.delete(
      `/closet/${id}`
    );

  },

};