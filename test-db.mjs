import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

try {
  const result = await sql`SELECT NOW()`;
  console.log("DB OK:", result);
} catch (error) {
  console.error("DB ERROR:", error);
}