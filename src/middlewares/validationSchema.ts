import { z } from 'zod';

export const createCommissionSchema = z.object({
  clientName: z.string().min(1, "Nama wajib diisi!"),
  projectType: z.enum(['Illustration', 'Live2D Rigging', 'Separation', 'Other'], { message: 'Kategori tidak valid!' }),
  price: z.number({ message: "Harga wajib diisi!" }).nonnegative("Harga tidak boleh minus!"),
  deadline: z.coerce.date({ message: "Format tanggal harus ISO 8601 (2026-04-28T00:00:00Z)" }),
});
