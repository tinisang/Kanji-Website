import bcrypt from "bcryptjs";
import { sql } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const passwordHash = await bcrypt.hash(
      password,
      10
    );

    const [user] = await sql`
      INSERT INTO users (
        email,
        password_hash
      )
      VALUES (
        ${email},
        ${passwordHash}
      )
      RETURNING *
    `;

    await sql`
      INSERT INTO kanji_group (
        user_id,
        name,
        position
      )
      VALUES (
        ${user.id},
        'Unclassified',
        0
      )
    `;

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Register failed",
      },
      {
        status: 500,
      }
    );
  }
}