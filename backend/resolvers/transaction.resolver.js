import { GraphQLScalarType, Kind } from "graphql";
import Transaction from "../models/transaction.model.js";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Custom Date scalar type",
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

const transactionResolver = {
  Date: dateScalar,

  Query: {
    transactions: async () => {
      try {
        const transactions = await Transaction.find();
        return transactions;
      } catch (err) {
        console.error("Error getting transactions:", err);
        throw new Error("Error getting transactions");
      }
    },
    transaction: async (_, { transactionId }) => {
      try {
        const transaction = await Transaction.findById(transactionId);
        if (!transaction) {
          throw new Error("Transaction not found");
        }
        return transaction;
      } catch (err) {
        console.error("Error getting transaction:", err);
        throw new Error("Error getting transaction");
      }
    },
    categoryStatistics: async () => {
      try {
        const transactions = await Transaction.find();
        const categoryMap = {};

        transactions.forEach((transaction) => {
          if (!categoryMap[transaction.category]) {
            categoryMap[transaction.category] = 0;
          }
          categoryMap[transaction.category] += transaction.amount;
        });

        return Object.entries(categoryMap).map(([category, totalAmount]) => ({
          category,
          totalAmount,
        }));
      } catch (err) {
        console.error("Error getting category statistics:", err);
        throw new Error("Error getting category statistics");
      }
    },
  },

  Mutation: {
    createTransaction: async (_, { input }) => {
      try {
        const newTransaction = new Transaction({
          ...input,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (err) {
        console.error("Error creating transaction:", err);
        throw new Error("Error creating transaction");
      }
    },
    updateTransaction: async (_, { input }) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );
        if (!updatedTransaction) {
          throw new Error("Transaction not found");
        }
        return updatedTransaction;
      } catch (err) {
        console.error("Error updating transaction:", err);
        throw new Error("Error updating transaction");
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deletedTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );
        if (!deletedTransaction) {
          throw new Error("Transaction not found");
        }
        return deletedTransaction;
      } catch (err) {
        console.error("Error deleting transaction:", err);
        throw new Error("Error deleting transaction");
      }
    },
  },
};

export default transactionResolver;
