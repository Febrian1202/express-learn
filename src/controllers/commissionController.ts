import { Request, Response } from "express";
import { db } from "../db";
import { commission } from "../db/schema";

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

