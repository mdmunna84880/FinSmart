import { Router } from "express";
import { registerUser, loginUser, logoutUser, getUserProfile } from "../controllers/userController.js";
import { validateRequest } from "../middlewares/validateMiddleware.js";
import { registerSchema, loginSchema } from "../utils/AuthValidation.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { noCache } from "../middlewares/noCache.js";

const router = Router();

// Unsecured routes
router.post("/register", validateRequest(registerSchema), registerUser);
router.post("/login", validateRequest(loginSchema), loginUser);

// Secured/Protected routes
router.post("/logout", verifyJWT, logoutUser);
router.get("/me", verifyJWT, noCache, getUserProfile);

export default router;
