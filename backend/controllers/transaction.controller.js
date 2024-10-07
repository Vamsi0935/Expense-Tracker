import Transaction from "../models/transaction.model.js";

// Get all transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error getting transactions:", error);
    res.status(500).json({ message: "Error getting transactions" });
  }
};

// Get a specific transaction by ID
export const getTransactionById = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json(transaction);
  } catch (error) {
    console.error("Error getting transaction:", error);
    res.status(500).json({ message: "Error getting transaction" });
  }
};

// Create a new transaction
export const createTransaction = async (req, res) => {
  try {
    const { description, category, option, amount, location, date } = req.body;

    if (!description || !category || !option || !amount || !date) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const newTransaction = new Transaction({
      description,
      category,
      option,
      amount,
      location: location || "Unknown",
      date,
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Error creating transaction" });
  }
};

// Update a transaction by ID
export const updateTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error("Error updating transaction:", error);
    res.status(500).json({ message: "Error updating transaction" });
  }
};

// Delete a transaction by ID
export const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    console.log("Transaction ID:", transactionId);

    const deletedTransaction = await Transaction.findByIdAndDelete(
      transactionId
    );

    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction deleted successfully",
      deletedTransaction,
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Error deleting transaction" });
  }
};

// Get category statistics
export const getCategoryStatistics = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    const categoryMap = {};

    transactions.forEach((transaction) => {
      if (!categoryMap[transaction.category]) {
        categoryMap[transaction.category] = 0;
      }
      categoryMap[transaction.category] += transaction.amount;
    });

    const categoryStatistics = Object.entries(categoryMap).map(
      ([category, totalAmount]) => ({
        category,
        totalAmount,
      })
    );

    res.status(200).json(categoryStatistics);
  } catch (error) {
    console.error("Error getting category statistics:", error);
    res.status(500).json({ message: "Error getting category statistics" });
  }
};
