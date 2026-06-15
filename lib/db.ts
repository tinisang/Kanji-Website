import { neon } from '@neondatabase/serverless';
console.log(process.env.DATABASE_URL);
export const sql = neon(
    
  process.env.DATABASE_URL!
);