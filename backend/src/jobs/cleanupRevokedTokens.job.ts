import cron from 'node-cron';
import { revokedTokenRepository } from '../repositories/revokedToken.repository';

export const startRevokedTokenCleanupJob = (): void => {
  cron.schedule('0 * * * *', async () => {
    console.log('[CRON] Cleaning expired revoked tokens...');
    await revokedTokenRepository.deleteExpired();
  });
};
