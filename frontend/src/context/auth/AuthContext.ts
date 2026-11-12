import { createContext } from "react";

import type {
  CreateAppUserDTO,
  UpdateProfileDTO,
  User,
} from "../../types/auth.types";

export interface AuthContextType {
  user: User | null;

  login(email: string, password: string): Promise<void>;

  register(data: CreateAppUserDTO): Promise<void>;

  logout(): Promise<void>;

  updateProfile(data: UpdateProfileDTO): Promise<void>;

  deleteAccount(): Promise<void>;

  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
