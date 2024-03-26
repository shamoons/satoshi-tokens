// src/app/api/users/route.ts
import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM users`;

    const users = rows.map((row) => ({
      id: row.id,
      name: row.name,
    }));

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic'