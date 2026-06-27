
import bcrypt from "bcryptjs";
import { sql } from "@/lib/db";

export async function createUser(
  email: string,
  password: string
) {

const passwordHash = await bcrypt.hash(password, 10);

  await sql`
    INSERT INTO users (
      email,
      password_hash
    )
    VALUES (
      ${email},
      ${passwordHash}
    )
  `;
}