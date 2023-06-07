import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_rul: process.env.DATABASE_URL,
  default_user_password: process.env.DEFAULT_USER_PASSWORD,
};
