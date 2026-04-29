import { db } from ".";
import { commission } from "./schema";
import { faker } from "@faker-js/faker";

const seedData = async () => {
  console.log("Memulai seeding data!");

  try {
    const dummyCommissions: any[] = [];

    // 50 data komisi palsu
    for (let i = 0; i < 50; i++) {
      dummyCommissions.push({
        clientName: faker.person.fullName(),
        projectType: faker.helpers.arrayElement(['Illustration', 'Live2D Rigging', 'Separation', 'Other']),
        price: faker.number.int({ min: 500000, max: 5000000 }),
        createdAt: faker.date.recent({ days: 90 }),
        deadline: faker.date.soon({ days: 30 }),
        status: faker.helpers.arrayElement(["Pending", "InProcess", "Completed", "Cancelled"]),
      });
    }

    await db.insert(commission).values(dummyCommissions);

    console.log("Proses seeding selesai!")
  } catch (e) {
    console.error('Gagal melakukan seeding:', e);
  } finally {
    process.exit(0);
  }
}

seedData();
