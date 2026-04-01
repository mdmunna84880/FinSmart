import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/userController.js";
import { validateRequest } from "../middlewares/validateMiddleware.js";
import { registerSchema, loginSchema } from "../utils/AuthValidation.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

// Unsecured routes
router.post("/register", validateRequest(registerSchema), registerUser);
router.post("/login", validateRequest(loginSchema), loginUser);

// Secured/Protected routes
router.post("/logout", verifyJWT, logoutUser);

export default router;
