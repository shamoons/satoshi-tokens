import { Pool } from 'pg';

console.log(process.env.POSTGRES_USER,
  process.env.POSTGRES_HOST,
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_PASSWORD,
  5432)

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432, // Default PostgreSQL port
});

export default pool;