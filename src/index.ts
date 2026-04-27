import express, { type Request, type Response } from 'express';
import 'dotenv/config';
import { db } from './db';
import { users } from './db/schema';
import { error } from 'node:console';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Route
app.get('/', (req: Request, res: Response) => {
  res.send('Express di Termux berjalan ');
});

// Endpoint untuk melihat user 
app.get('/users', async (req: Request, res: Response) => {
  try {
    const allUsers = await db.select().from(users);
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Gagal mendapatkan data user" });
  }
})

// Endpoint untuk menambah user
app.post('/users', async (res: Response, req: Request) => {
  try {
    const { email, name } = req.body;
    await db.insert(users).values({ name, email });
    res.status(201).json({ message: 'User berhasil ditambahkan' });
  } catch (error) {
    res.status(500).json({ error: "Gagal menambahkan user baru" });
  }
})

// Run Server
app.listen(port, () => {
  console.log(`Server berjalan di localhost:${port}`);
});
