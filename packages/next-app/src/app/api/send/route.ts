// src/app/api/send/route.ts
import { sql } from "@vercel/postgres";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { senderId, recipientId, amount } = await request.json();

  try {
    // TODO: Need to implement this as a transaction
    const { rows: senderBalanceRows } = await sql`UPDATE users SET balance = balance - ${amount} WHERE id = ${senderId}`;
    const { rows: recipientBalanceRows } = await sql`UPDATE users SET balance = balance + ${amount} WHERE id = ${recipientId}`;
    const { rows: transactionRows } = await sql`INSERT INTO transactions (sender_id, recipient_id, amount) VALUES (${senderId}, ${recipientId}, ${amount})`;

    console.log({ senderBalanceRows, recipientBalanceRows, transactionRows })

    return NextResponse.json({ message: 'Tokens sent successfully' });
  } catch (error) {
    console.error('Error sending tokens:', error);
    return NextResponse.json({ error: 'Failed to send tokens' }, { status: 500 });
  }
}