import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nodeEnv = process.env.NODE_ENV || 'development';

const envFilename = nodeEnv === 'production'
  ? '.env.prod'
  : nodeEnv === 'staging'
    ? '.env.staging'
    : '.env';

const envPath = path.resolve(__dirname, `../../env/${envFilename}`);

dotenv.config({ path: envPath });

export const CURRENT_ENV = nodeEnv;