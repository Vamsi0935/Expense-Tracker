import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    category: "Select Category",
    option: "Select Options",
    amount: "",
    location: "",
    date: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // For disabling the button during submit

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent submitting again while the request is in progress
    if (isSubmitting) return;

    const transactionData = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    setIsSubmitting(true); // Disable the button when submitting

    try {
      const response = await axios.post(
        "http://localhost:5000/api/create",
        transactionData,
        { withCredentials: true }
      );

      // Reset form data on successful submission
      setFormData({
        description: "",
        category: "Select Category",
        option: "Select Options",
        amount: "",
        location: "",
        date: "",
      });

      // Success alert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Transaction added successfully.",
      });

      console.log("Transaction created:", response.data);
    } catch (error) {
      console.error("Error creating transaction:", error);

      // Error alert
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to add transaction.",
      });
    } finally {
      setIsSubmitting(false); // Re-enable the button after the request completes
    }
  };

  return (
    <form
      className="w-full max-w-lg flex flex-col gap-5 px-3"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-wrap">
        <div className="w-full">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="description"
            name="description"
            type="text"
            required
            value={formData.description}
            onChange={handleChange}
            placeholder="Rent, Groceries, Salary, etc."
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="w-full flex-1 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Select Category" disabled>
              Select Category
            </option>
            <option value="saving">Saving</option>
            <option value="expense">Expense</option>
            <option value="investments">Investments</option>
          </select>
        </div>

        <div className="w-full flex-1 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
            htmlFor="option"
          >
            Expense Options
          </label>
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="option"
            name="option"
            value={formData.option}
            onChange={handleChange}
          >
            <option value="Select Options" disabled>
              Select Options
            </option>
            <option value="education">Education</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
            <option value="clothing">Clothing</option>
            <option value="travelling">Travelling</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="w-full flex-1 mb-6 md:mb-0">
          <label
            className="block uppercase text-white text-xs font-bold mb-2"
            htmlFor="amount"
          >
            Amount(₹)
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="amount"
            name="amount"
            type="number"
            placeholder="15000"
            required
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="w-full flex-1 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="location"
            name="location"
            type="text"
            placeholder="Hyderabad"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className="w-full flex-1">
          <label
            className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            required
            value={formData.date}
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        className="text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "+ Add Expense"}
      </button>
    </form>
  );
};

export default TransactionForm;
