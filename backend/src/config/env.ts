import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test'], {
    message: 'NODE_ENV must be one of development, production, or test',
  }),

  PORT: z.coerce
    .number({ message: 'Invalid PORT number' })
    .min(1, { message: 'Invalid PORT number' })
    .max(65535, { message: 'Invalid PORT number' }),

  // Database configuration
  POSTGRES_USER: z.string().min(1, { message: 'POSTGRES_USER is required' }),
  POSTGRES_PASSWORD: z
    .string()
    .min(1, { message: 'POSTGRES_PASSWORD is required' }),
  POSTGRES_DB: z.string().min(1, { message: 'POSTGRES_DB is required' }),
  POSTGRES_HOST: z.string().min(1, { message: 'POSTGRES_HOST is required' }),
  POSTGRES_PORT: z.coerce
    .number({ message: 'Invalid POSTGRES_PORT number' })
    .min(1, { message: 'Invalid POSTGRES_PORT number' })
    .max(65535, { message: 'Invalid POSTGRES_PORT number' }),
});

export type Env = z.infer<typeof envSchema>;

export const env: Readonly<Env> = ((): Readonly<Env> => {
  try {
    const parsed = envSchema.parse(process.env);
    console.log('✅ Environment variables loaded successfully');
    return parsed;
  } catch (error) {
    console.error('❌ Invalid environment variables:');
    if (error instanceof z.ZodError) {
      for (const issue of error.issues) {
        console.error(`    ❗ ${issue.path.join('.')} — ${issue.message}`);
      }
    } else {
      console.error(error);
    }
    process.exit(1);
  }
})();
