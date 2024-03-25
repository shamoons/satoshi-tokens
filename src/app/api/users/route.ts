// src/app/api/users/route.ts
import { User } from '@/types/user';
import { NextResponse } from 'next/server';

export async function GET() {
  // Hardcoded list of users for now
  const users: User[] = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    { id: '3', name: 'Charlie' },
  ];

  return NextResponse.json({ users });
}