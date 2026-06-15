import { sql } from '@/lib/db';

export default async function TestPage() {
  const result = await sql`
    SELECT NOW()
  `;

  return (
    <pre>
      {JSON.stringify(result, null, 2)}
    </pre>
  );
}