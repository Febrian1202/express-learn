import express, { type Request, type Response } from 'express';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Route
app.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Commission Tracker API sudah berjalan' });
});

// Run Server
app.listen(port, () => {
  console.log(`Server berjalan di localhost:${port}`);
});
