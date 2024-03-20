import { Router } from "express";

import * as authController from "../controller/auth.controller.js";
import { requireAuth } from "../middleware/requireAuth.js";


const router = Router();

router.post("/register", authController.registerNewUser);
router.post("/login", authController.loginUser);
router.get("/getauth", authController.validateToken);
router.post("/logout", requireAuth, authController.logoutUser);
export default router;

