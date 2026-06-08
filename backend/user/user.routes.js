import { Router } from "express";
import UserController from "./user.controller.js";
import { AuthMiddleware } from "../middleware/auth.middleware.js";

const AuthRouter = Router();

AuthRouter.post("/login", UserController.Login);
AuthRouter.post("/register", UserController.Register);
AuthRouter.get("/:id", AuthMiddleware, UserController.GetUser);
// AuthRouter.put("/:id", UserController.UpdateUser);
// AuthRouter.delete("/:id", UserController.DeleteUser);

export default AuthRouter;
