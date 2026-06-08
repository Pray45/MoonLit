import "dotenv/config";

// Constants

export const SALT_ROUNDS = 10;
export const JWT_REFRESH_EXPIRY = "7d";
export const JWT_ACCESS_EXPIRY = "15m";

// ENV

export const env = {
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
};
