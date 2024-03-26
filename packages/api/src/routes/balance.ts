import express from 'express';
import pool from '../../db';

const router = express.Router();

router.get('/balance', async (req, res) => {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const { rows } = await pool.query(
      'SELECT balance FROM users WHERE CAST(id AS TEXT) LIKE $1',
      [`${userId}%`]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { balance } = rows[0];
    res.json({ balance });
  } catch (error) {
    console.error('Error fetching balance:', error);
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
});

export default router;