import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  env,
  JWT_ACCESS_EXPIRY,
  JWT_REFRESH_EXPIRY,
  SALT_ROUNDS,
} from "./config.js";

// Bcrypt

export const BcryptHash = async (password) => {
  if (!SALT_ROUNDS) throw new Error("Salt rounds not found");
  try {
    const hashedPass = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPass;
  } catch (error) {
    throw error;
  }
};

export const BcryptCheck = async (password, hash) => {
  try {
    const isCorrect = await bcrypt.compare(password, hash);
    return isCorrect;
  } catch (error) {
    throw error;
  }
};

// JWT

export const CreateAccessToken = (payload) => {
  if (!env.JWT_ACCESS_SECRET) throw new Error("JWT access secret not found");
  if (!payload) throw new Error("Payload required");

  const token = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRY || "15m",
  });
  return token;
};

export const CreateRefreshToken = (payload) => {
  if (!env.JWT_REFRESH_SECRET) throw new Error("JWT refresh secret not found");
  if (!payload) throw new Error("Payload required");

  const token = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRY || "7d",
  });
  return token;
};

export const VerifyAccessToken = (token) => {
  if (!env.JWT_ACCESS_SECRET) throw new Error("JWT access secret not found");

  try {
    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
    return decoded;
  } catch (error) {
    console.error("Access token verification failed:", error);
    return null;
  }
};

export const VerifyRefreshToken = (token) => {
  if (!env.JWT_REFRESH_SECRET) throw new Error("JWT refresh secret not found");

  try {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET);
    return decoded;
  } catch (error) {
    console.error("Refresh token verification failed:", error);
    return null;
  }
};
