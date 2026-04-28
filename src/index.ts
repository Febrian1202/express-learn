import express, { type Request, type Response } from 'express';
import 'dotenv/config';
import commissionRoutes from './routes/commissionRoutes';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Route
app.get('/ping', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Commission Tracker API sudah berjalan' });
});

// Daftar Route
app.use('/api/commissions', commissionRoutes)

// Run Server
app.listen(port, () => {
  console.log(`Server berjalan di localhost:${port}`);
});
