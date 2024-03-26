// src/app/api/send/route.ts
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { senderId, recipientId, amount } = await request.json();

  try {
    // Start transaction
    await prisma.$transaction(async (tx: any) => {
      // Update sender balance
      const sender = await tx.user.update({
        where: { id: senderId },
        data: { balance: { decrement: amount } },
      });

      // Check if sender has enough balance
      if (sender.balance < 0) {
        throw new Error('Insufficient balance');
      }

      // Update recipient balance
      await tx.user.update({
        where: { id: recipientId },
        data: { balance: { increment: amount } },
      });

      // Insert transaction
      await tx.transaction.create({
        data: {
          senderId,
          recipientId,
          amount,
        },
      });
    });

    return NextResponse.json({ message: 'Tokens sent successfully' });
  } catch (error) {
    console.error('Error sending tokens:', error);
    return NextResponse.json({ error: 'Failed to send tokens' }, { status: 500 });
  }
}