import { GetUser, Login, Register } from "./user.service.js";
import { CreateAccessToken, CreateRefreshToken } from "../utils/hooks.js";

const UserController = {
  Login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Login({ email, password });
      if (!user)
        return res.status(401).json({ message: "Invalid credentials" });

      const payload = { id: user.id, email: user.email };
      const accessToken = CreateAccessToken(payload);
      const refreshToken = CreateRefreshToken(payload);

      return res.status(200).json({
        success: true,
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: error.message,
        error,
      });
    }
  },

  Register: async (req, res) => {
    try {
      const { name, email, age, password } = req.body;
      const user = await Register({ name, email, age, password });
      if (!user)
        return res.status(400).json({ message: "Registration failed" });

      const payload = { id: user.id, email: user.email };
      const accessToken = CreateAccessToken(payload);
      const refreshToken = CreateRefreshToken(payload);

      return res.status(200).json({
        success: true,
        accessToken,
        refreshToken,
        user,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  GetUser: async (req, res) => {
    try {
      const user = await GetUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  // UpdateUser: async (req, res) => {
  //   const { name } = req.body;
  //   const user = await UpdateUser(req.params.id, name);
  //   if (!user) {
  //     return res.status(400).json({ message: "Update failed" });
  //   }
  //   return res.status(200).json(user);
  // },

  // DeleteUser: async (req, res) => {
  //   const user = await DeleteUser(req.params.id);
  //   if (!user) {
  //     return res.status(400).json({ message: "Delete failed" });
  //   }
  //   return res.status(200).json(user);
  // },
};

export default UserController;
