import { api } from "../api/axios";
import type { User } from "../types/auth.types";


export interface LoginDTO {
  email: string;
  password: string;
}


export const authApi = {

  async login(data: LoginDTO): Promise<void> {
    await api.post("/auth/login", data);
  },


  async logout(): Promise<void> {
    await api.post("/auth/logout");
  },


  async me(): Promise<User> {
    const response = await api.get<User>("/auth/me");

    return response.data;
  },

};

