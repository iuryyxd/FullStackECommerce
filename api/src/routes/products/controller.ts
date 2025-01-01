import { Request, Response } from "express";

export function listProducts(req: Request, res: Response) {
  res.send("Get products");
}

export function createProduct(req: Request, res: Response) {
  res.send("Create product");
}

export function getProductById(req: Request, res: Response) {
  res.send("Get product");
}

export function updateProduct(req: Request, res: Response) {
  res.send("Update product");
}

export function deleteProduct(req: Request, res: Response) {
  res.send("Delete product");
}
