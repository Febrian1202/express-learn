import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import 'dotenv/config';

// Pool connection
const poolConnection = mysql.createPool(process.env.DATABASE_URL as string);

// Init drizzle
export const db = drizzle(poolConnection);
