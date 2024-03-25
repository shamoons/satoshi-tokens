// src/app/api/users/route.ts
import { User } from '@/types/user';
import { NextResponse } from 'next/server';

export async function GET() {
  // Hardcoded list of users for now
  const users: User[] = [
    { id: Math.random().toString(36).substring(7), name: 'Alice' },
    { id: Math.random().toString(36).substring(7), name: 'Bob' },
    { id: Math.random().toString(36).substring(7), name: 'Charlie' },
  ];

  return NextResponse.json({ users });
}