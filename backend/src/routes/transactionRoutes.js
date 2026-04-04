import { Router } from "express";
import {
    addTransaction,
    getTransactions,
    getSingleTransaction,
    updateTransaction,
    deleteTransaction,
    getAvailableFilters
} from "../controllers/transactionController.js";
import { validateRequest } from "../middlewares/validateMiddleware.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { addTransactionSchema, updateTransactionSchema } from "../utils/TransactionValidation.js";

const router = Router();

// Verify whether the user exists
router.use(verifyJWT);

// Dynamic filters for dropdowns
router.get("/filters", getAvailableFilters);

// Create and Read routes for transactions
router
    .route("/")
    .post(validateRequest(addTransactionSchema), addTransaction)
    .get(getTransactions);

// Read, Update, Delete for an individual transaction
router
    .route("/:id")
    .get(getSingleTransaction)
    .put(validateRequest(updateTransactionSchema), updateTransaction)
    .delete(deleteTransaction);

export default router;
