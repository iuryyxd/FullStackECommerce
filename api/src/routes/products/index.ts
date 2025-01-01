import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Get products");
});

router.post("/", (req, res) => {
  res.send("Create product");
});

router.get("/:id", (req, res) => {
  res.send("Get product");
});

export default router;
