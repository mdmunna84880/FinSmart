import { Router } from "express";
import {
    setBudget,
    getBudget,
    getBudgetSummary
} from "../controllers/budgetController.js";
import { validateRequest } from "../middlewares/validateMiddleware.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { setBudgetSchema } from "../utils/BudgetValidation.js";

const router = Router();

// Verify whether the user exists
router.use(verifyJWT);

// Create, Update and Read routes for budgets
router.post("/", validateRequest(setBudgetSchema), setBudget);
router.get("/", getBudget);

router.get("/summary", getBudgetSummary);

export default router;
