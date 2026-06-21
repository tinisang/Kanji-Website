
import bcrypt from "bcryptjs";
import { sql } from "@/lib/db";

export async function createUser(
  email: string,
  password: string
) {

console.log("REGISTER PASSWORD:", password);

const passwordHash = await bcrypt.hash(password, 10);

console.log("REGISTER HASH:", passwordHash);
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