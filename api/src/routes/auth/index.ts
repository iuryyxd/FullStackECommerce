import { Router } from "express";
import {
  createUserSchema,
  loginSchema,
  usersSchema,
} from "../../db/users-schema";
import { validateData } from "../../middlewares/validation-middleware";
import bcrypt from "bcrypt";
import { db } from "../../db/index";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const router = Router();

const generateUserToken = (user: any) => {
  return jwt.sign({ userId: user.id, role: user.role }, "your-secret", {
    expiresIn: "30d",
  });
};

router.post("/register", validateData(createUserSchema), async (req, res) => {
  try {
    const data = req.cleanBody;
    data.password = await bcrypt.hash(data.password, 10);

    const [user] = await db.insert(usersSchema).values(data).returning();

    // @ts-ignore
    delete user.password;
    const token = generateUserToken(user);

    res.status(201).json({ user, token });
  } catch (e) {
    console.log(e);
    res.status(500).send("Something went wrong");
  }
});

router.post("/login", validateData(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.cleanBody;

    const [user] = await db
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.email, email));
    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    // create a jwt token
    const token = generateUserToken(user);
    // @ts-ignore
    delete user.password;
    res.status(200).json({ token, user });
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
});

export default router;
