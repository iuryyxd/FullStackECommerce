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
import { verifySeller, verifyToken } from "../../middlewares/auth-middleware";

const router = Router();

router.get("/", listProducts);
router.post(
  "/",
  verifyToken,
  verifySeller,
  validateData(createProductSchema),
  createProduct
);
router.get("/:id", getProductById);
router.put(
  "/:id",
  verifyToken,
  verifySeller,
  validateData(updateProductSchema),
  updateProduct
);
router.delete("/:id", verifyToken, verifySeller, deleteProduct);

export default router;
