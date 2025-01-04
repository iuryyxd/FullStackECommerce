import { Router } from "express";
import {
  listProducts,
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
} from "./controller";
import { validateData } from "../../middlewares/validation-middleware";
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/products-schema";

const router = Router();

router.get("/", listProducts);
router.post("/", validateData(createProductSchema), createProduct);
router.get("/:id", getProductById);
router.put("/:id", validateData(updateProductSchema), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
