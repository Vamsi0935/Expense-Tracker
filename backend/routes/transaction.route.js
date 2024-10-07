import express from "express";
import {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getCategoryStatistics,
} from "../controllers/transaction.controller.js";

const router = express.Router();

router.get("/list", getTransactions);
router.get("/transactions/:transactionId", getTransactionById);
router.post("/create", createTransaction);
router.put("/update/:transactionId", updateTransaction);
router.delete("/delete/:transactionId", deleteTransaction);
router.post("/transactions/categoryStatistics", getCategoryStatistics);

export default router;
