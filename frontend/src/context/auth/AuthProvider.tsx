import { useEffect, useState, type ReactNode } from "react";

import { AuthContext, type AuthContextType } from "./AuthContext";

import { authApi } from "../../services/authApi";
import { userApi } from "../../services/userApi";

import type {
  CreateAppUserDTO,
  UpdateProfileDTO,
  User,
} from "../../types/auth.types";

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authApi.me();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    void checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    await authApi.login({ email, password });

    const currentUser = await authApi.me();
    setUser(currentUser);
  };

  const logout = async () => {
    try {
      await authApi.logout();
      console.log("[LOGOUT] Déconnexion réussie");
    } catch (error) {
      console.error("[LOGOUT] Impossible de contacter le serveur", error);
    } finally {
      setUser(null);
    }
  };

  const register = async (data: CreateAppUserDTO) => {
    try {
      await authApi.register(data);

      const currentUser = await authApi.me();
      setUser(currentUser);

      console.log("[REGISTER] Inscription et connexion réussies");
    } catch (error) {
      console.error("[REGISTER] Échec de l'inscription", error);
      throw error;
    }
  };

  const updateProfile = async (data: UpdateProfileDTO) => {
    try {
      const updatedUser = await userApi.updateProfile(data);

      setUser(updatedUser);

      console.log("[PROFILE] Profil mis à jour");
    } catch (error) {
      console.error("[PROFILE] Échec de la mise à jour", error);
      throw error;
    }
  };

  // Suppression du compte
  const deleteAccount = async () => {
    try {
      await userApi.deleteAccount();

      // Le compte a été supprimé : on vide l'utilisateur du contexte.
      setUser(null);

      console.log("[ACCOUNT] Compte supprimé avec succès");
    } catch (error) {
      console.error("[ACCOUNT] Échec de la suppression du compte", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    register,
    login,
    logout,
    updateProfile,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
