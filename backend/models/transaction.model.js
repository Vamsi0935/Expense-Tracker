import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["saving", "expense", "investments"],
    required: true,
  },
  option: {
    type: String,
    enum: [
      "education",
      "health",
      "subscriptions",
      "clothing",
      "travelling",
      "others",
    ],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    default: "Unknown",
  },
  date: {
    type: Date,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
