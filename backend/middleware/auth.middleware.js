import { VerifyAccessToken } from "../utils/hooks.js";

export const AuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({
      message: "Token missing",
    });

  const token = authHeader.split(" ")[1];

  const decoded = VerifyAccessToken(token);

  if (!decoded)
    return res.status(401).json({
      message: "Invalid token",
    });

  req.user = decoded;

  next();
};
