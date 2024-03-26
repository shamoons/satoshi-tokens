import express from 'express';
import pool from '../../db';

const router = express.Router();

router.post('/send', async (req, res) => {
  const { senderId, recipientId, amount } = req.body;

  try {
    // Start transaction
    await pool.query('BEGIN');

    // Update sender balance
    const senderBalanceResult = await pool.query(
      'UPDATE users SET balance = balance - $1 WHERE id = $2 RETURNING balance',
      [amount, senderId]
    );

    // Check if sender has enough balance
    if (senderBalanceResult.rows[0].balance < 0) {
      await pool.query('ROLLBACK');
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Update recipient balance
    await pool.query(
      'UPDATE users SET balance = balance + $1 WHERE id = $2',
      [amount, recipientId]
    );

    // Insert transaction
    await pool.query(
      'INSERT INTO transactions (sender_id, recipient_id, amount) VALUES ($1, $2, $3)',
      [senderId, recipientId, amount]
    );

    // Commit transaction
    await pool.query('COMMIT');

    res.json({ message: 'Tokens sent successfully' });
  } catch (error) {
    // Rollback transaction on error
    await pool.query('ROLLBACK');
    console.error('Error sending tokens:', error);
    res.status(500).json({ error: 'Failed to send tokens' });
  }
});

export default router;