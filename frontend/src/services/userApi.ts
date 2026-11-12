import { api } from "../api/axios";

import type { User, UpdateProfileDTO } from "../types/auth.types";

export const userApi = {
  async updateProfile(data: UpdateProfileDTO): Promise<User> {
    const response = await api.patch<User>("/users/me", data);
    return response.data;
  },

  async deleteAccount(): Promise<void> {
    await api.delete("/users/me");
  },
};
