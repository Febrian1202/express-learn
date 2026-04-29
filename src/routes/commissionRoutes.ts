import { Router } from "express";
import { getAllCommissions, createCommission, getMonthlyStats } from "../controllers/commissionController";
import { validateData } from "../middlewares/validateRequest";
import { createCommissionSchema } from "../middlewares/validationSchema";

const router = Router();

// Route GET tidak perlu validation
router.get('/', getAllCommissions);

// Route POST dicegat oleh zod dulu sebelum diteruskan ke controllers
router.post('/',
  validateData(createCommissionSchema),
  createCommission);

router.get('/stats',
  getMonthlyStats);

export default router;
