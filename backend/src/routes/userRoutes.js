import { Router } from "express";
import { registerUser, loginUser, logoutUser, getUserProfile, changePassword } from "../controllers/userController.js";
import { validateRequest } from "../middlewares/validateMiddleware.js";
import { registerSchema, loginSchema, changePasswordSchema } from "../utils/AuthValidation.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { noCache } from "../middlewares/noCache.js";

const router = Router();

// Unsecured routes
router.post("/register", validateRequest(registerSchema), registerUser);
router.post("/login", validateRequest(loginSchema), loginUser);

// Secured/Protected routes
router.post("/logout", verifyJWT, logoutUser);
router.get("/me", verifyJWT, noCache, getUserProfile);
router.put("/change-password", verifyJWT, validateRequest(changePasswordSchema), changePassword);

export default router;
