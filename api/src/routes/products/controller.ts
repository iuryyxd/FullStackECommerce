import { Request, Response } from "express";
import { db } from "../../db";
import { productsTable } from "../../db/products-schema";
import { eq } from "drizzle-orm";

export async function listProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(productsTable);

    res.json(products);
  } catch (e) {
    res.status(500).json(e);
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const [product] = await db
      .insert(productsTable)
      .values(req.body)
      .returning();

    res.status(201).json(product);
  } catch (e) {
    res.status(500).json(e);
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const product = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(req.params.id)));

    if (!product || product.length === 0) {
      res.status(404).send({ message: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (e) {
    res.status(500).json(e);
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const updatedFields = req.body;

    const [product] = await db
      .update(productsTable)
      .set(updatedFields)
      .where(eq(productsTable.id, Number(req.params.id)))
      .returning();

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (e) {
    res.status(500).json(e);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, Number(req.params.id)))
      .returning();

    if (deletedProduct) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (e) {
    res.status(500).json(e);
  }
}
