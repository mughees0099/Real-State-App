import express from "express";
const router = express.Router();
import User from "../models/user.js";
import { Home, createUser } from "../controllers/userController.js";

router.get("/", Home);
router.get("/create", createUser);

export default router;
