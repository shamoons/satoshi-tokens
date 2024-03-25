// src/app/api/balance/route.ts
import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const { rows } = await sql`
      SELECT balance
      FROM users
      WHERE CAST(id AS TEXT) LIKE ${userId + '%'}
    `;
    // TODO: Fix this. Currently, we're using a shortened userId for demonstration purposes

    if (rows.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { balance } = rows[0];

    return NextResponse.json({ balance });
  } catch (error) {
    console.error('Error fetching balance:', error);
    return NextResponse.json({ error: 'Failed to fetch balance' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';