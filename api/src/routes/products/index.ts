import { Router } from "express";
import {
  listProducts,
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
} from "./controller";

const router = Router();

router.get("/", listProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
