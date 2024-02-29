import express from "express";
// import User from "../models/user.js";
import { Home, createUser } from "../controllers/userController.js";
const router = express.Router();

router.get("/", Home);

// router.get("/create", createUser);

export default router;
