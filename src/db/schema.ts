import { mysqlTable, varchar, timestamp, int, mysqlEnum } from "drizzle-orm/mysql-core";

export const commission = mysqlTable('commissions', {
  id: int('id').autoincrement().primaryKey(),
  clientName: varchar('client_name', { length: 255 }).notNull(),
  projectType: mysqlEnum('project_type', ['Illustration', 'Live2D Rigging', 'Separation', 'Other']).notNull(),
  price: int('price').notNull(),
  deadline: timestamp('deadline').notNull(),
  status: mysqlEnum('status', ['Pending', 'InProcess', 'Completed', 'Cancelled']).default("Pending").notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
})
