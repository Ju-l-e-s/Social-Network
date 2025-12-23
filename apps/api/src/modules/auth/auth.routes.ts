import { Router } from "express";
import * as authController from "@/modules/auth/auth.controller";
import { authenticate } from "@/middlewares/auth";

export const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authenticate, authController.logout);
router.get("/me", authenticate, authController.me);
