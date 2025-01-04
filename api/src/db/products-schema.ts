import {
  doublePrecision,
  integer,
  pgTable,
  serial,
  text,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const productsTable = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  image: text("image"),
  price: doublePrecision("price").notNull(),
});

export const createProductSchema = createInsertSchema(productsTable).omit({
  id: true,
});

export const updateProductSchema = createInsertSchema(productsTable)
  .omit({
    id: true,
  })
  .partial();
