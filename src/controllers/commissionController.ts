import { Request, Response } from "express";
import { db } from "../db";
import { commission } from "../db/schema";
import { and, gte, lte, eq, sum, count } from "drizzle-orm";

export const createCommission = async (req: Request, res: Response): Promise<void> => {
  try {
    // Mengambil data yang sudah divalidasi zod 
    const data = req.body;

    // Insert ke database dengan ORM Drizzle
    await db.insert(commission).values({
      clientName: data.clientName,
      projectType: data.projectType,
      price: data.price,
      deadline: data.deadline,
      status: 'Pending',
    });

    // Kirimkan respon berhasil ke client 
    res.status(200).json({
      success: true,
      message: "Data Commission berhasil ditambahkan!",
      data: data
    });
  } catch (e) {
    // Log error nya ke console
    console.error('Error saat menambahkan data commission:', e);

    // Kirimkan respon gagal ke client
    res.status(500).json({
      success: false,
      message: "Gagal menyimpan data commission"
    });
  }
};

export const getAllCommissions = async (_req: Request, res: Response): Promise<void> => {
  try {
    // Query ke database
    const allData = await db.select().from(commission);

    // Kirimkan respon berhasil dan data ke client
    res.status(200).json({
      success: true,
      data: allData,
    })
  } catch (e) {
    // Log errornya ke console
    console.error("Error saat mengambil data commission:", e);

    // Kirimkan respon gagal ke client
    res.status(500).json({
      success: false,
      message: "Gagal mengambil data commission!",
    });
  }
};

export const getMonthlyStats = async (req: Request, res: Response): Promise<void> => {
  try {
    // Ambil bulan dan tahun dari query URL, atau gunakan waktu sekarang
    const now = new Date();
    const targetMonth = req.query.month ? parseInt(req.query.month as string) : now.getMonth() + 1; // getMonth() dimulai dari 0
    const targetYear = req.query.year ? parseInt(req.query.year as string) : now.getFullYear();

    // Buat batas awal dan batas akhir bulan tersebut
    const startDate = new Date(`${targetYear}-${targetMonth.toString().padStart(2, '0')}-01T00:00:00.000Z`);

    const endDate = new Date(targetYear, targetMonth, 0);
    endDate.setHours(23, 59, 59, 999);

    // Drizzle query
    const statResult = await db.select({
      totalRevenue: sum(commission.price),
      totalProjects: count(commission.id)
    }).from(commission)
      .where(
        and(
          eq(commission.status, 'Completed'),
          gte(commission.updatedAt, startDate),
          lte(commission.updatedAt, endDate),
        )
      );

    // Return query ke client
    const finalData = statResult[0];

    res.status(200).json({
      success: true,
      period: `${targetYear}-${targetMonth}`,
      data: {
        totalRevenue: Number(finalData?.totalRevenue) || 0,
        totalProjects: Number(finalData?.totalProjects) || 0,
      }
    });
  } catch (e) {
    console.error('Gagal mengambil data stats:', e);

    res.status(500).json({
      success: false,
      message: 'Gagal menghitung statistik bulanan!',
    });
  }
}
