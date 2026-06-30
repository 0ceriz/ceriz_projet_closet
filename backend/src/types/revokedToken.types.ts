export interface RevokedTokenDb {
  id: string;
  token: string;
  expires_at: Date;
  revoked_at: Date;
}

export interface RevokedToken {
  id: string;
  token: string;
  expiresAt: Date;
  revokedAt: Date;
}

export interface CreateRevokedTokenRepositoryData {
  token: string;
  expiresAt: Date;
}
