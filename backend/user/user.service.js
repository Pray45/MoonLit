import { BcryptCheck, BcryptHash } from "../utils/hooks.js";
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const Login = async ({ email, password }) => {
  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) {
    throw new Error("User not found");
  }

  const isValid = await BcryptCheck(password, user.password);

  if (!isValid) {
    throw new Error("Invalid password");
  }

  return user;
};

export const Register = async ({ name, email, password }) => {
  try {
    if (!name) throw new Error("Name is required");
    if (!email) throw new Error("Email is required");
    if (!password) throw new Error("Password is required");

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    if (existingUser) throw new Error("Email already exists");

    const hashedPassword = await BcryptHash(password);

    const [user] = await db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
      })
      .returning();

    const returnUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return returnUser;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    throw error;
  }
};

export const GetUser = async (req, res) => {};

export const UpdateUser = async (req, res) => {};

export const DeleteUser = async (req, res) => {};
