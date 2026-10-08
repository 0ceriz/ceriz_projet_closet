import {
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  AuthContext,
  type AuthContextType,
} from "./AuthContext";

import {
  authApi,
} from "../../services/authApi";
import type { CreateAppUserDTO, User } from "../../types/auth.types";
interface Props {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: Props) {

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const checkAuth = async () => {

      try {

        const currentUser =
          await authApi.me();

        setUser(currentUser);

      } catch {

        setUser(null);

      } finally {

        setLoading(false);

      }

    };

    void checkAuth();

  }, []);

  const login = async (
    email: string,
    password: string
  ) => {

    await authApi.login({
      email,
      password,
    });

    const currentUser =
      await authApi.me();

    setUser(currentUser);
  };

const logout = async () => {
  try {
    await authApi.logout();

    console.log("[LOGOUT] Déconnexion réussie");
  } catch (error) {
    console.error(
      "[LOGOUT] Impossible de contacter le serveur",
      error
    );
  } finally {
    setUser(null);
  }
};

const register = async (
  data: CreateAppUserDTO
) => {
  try {
    await authApi.register(data);

    const currentUser = await authApi.me();

    setUser(currentUser);

    console.log(
      "[REGISTER] Inscription et connexion réussies"
    );
  } catch (error) {
    console.error(
      "[REGISTER] Échec de l'inscription",
      error
    );

    throw error;
  }
};

  const value: AuthContextType = {
    user,
    loading,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );

  
}