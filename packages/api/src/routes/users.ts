import express from 'express';
import pool from '../../db';

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT id, name FROM users');
    const users = rows;
    res.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;