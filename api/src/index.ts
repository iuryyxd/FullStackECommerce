import express, { json, urlencoded } from "express";
import productsRoutes from "./routes/products";
import authRoutes from "./routes/auth";

const app = express();
app.use(urlencoded({ extended: false }));
app.use(json());

const port = 3000;

app.use("/products", productsRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
