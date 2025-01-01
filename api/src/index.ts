import express from "express";
import productsRoutes from "./routes/products";
const app = express();
const PORT = 3000;

app.use("/products", productsRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
