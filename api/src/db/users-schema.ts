import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const usersSchema = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("user"),
  name: text("name"),
  address: text("address"),
});

export const createUserSchema = createInsertSchema(usersSchema).omit({
  id: true,
  role: true,
});

export const loginSchema = createInsertSchema(usersSchema).pick({
  email: true,
  password: true,
});
