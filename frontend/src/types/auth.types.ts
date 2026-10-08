export interface User {
  id: string;
  email: string;
  pseudo: string;
  pictureUrl?: string | null;
}

export interface CreateAppUserDTO {
  pseudo: string;
  email: string;
  password: string;
  pictureUrl?: string | null;
}