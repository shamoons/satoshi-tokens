// src/app/api/balance/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Hardcoded balance for now
  const balance = 1000;

  return NextResponse.json({ balance });
}