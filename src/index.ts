import express, { type Request, type Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import commissionRoutes from './routes/commissionRoutes';
import { globalErrorHandler } from './middlewares/errorHandler';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Route
app.get('/ping', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Commission Tracker API sudah berjalan' });
});

// Daftar Route
app.use('/api/commissions', commissionRoutes)

// Handle api yang tidak ada 
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Endpoint yang anda minta tidak ditemukan (404)",
  });
});

// Global Error Handler
app.use(globalErrorHandler);

// Run Server
app.listen(port, () => {
  console.log(`Server berjalan di localhost:${port}`);
});
