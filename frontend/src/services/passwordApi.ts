import { api } from "../api/axios";

interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}

export const passwordApi = {
  async changePassword(data: ChangePasswordDTO): Promise<void> {
    await api.patch("/users/me/password", data);
  },
};
