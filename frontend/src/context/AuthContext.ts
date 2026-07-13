import { createContext } from "react";
import type { User } from "../types/auth.types";


export interface AuthContextType {
  user: User | null;

  login(
    email: string,
    password: string
  ): Promise<void>;

  logout(): Promise<void>;

  loading: boolean;
}


export const AuthContext =
  createContext<AuthContextType | null>(null);