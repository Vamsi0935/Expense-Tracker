import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const TransactionPage = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: "",
    category: "",
    option: "",
    amount: "",
    location: "",
    date: "",
  });

  useEffect(() => {
    if (!transactionId) {
      Swal.fire({
        title: "Error!",
        text: "Invalid transaction ID.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const fetchTransaction = async () => {
      try {
        const response = await axios.get(
          `https://expense-tracker-api-six.vercel.app/api/transactions/${transactionId}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching transaction:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to load transaction data.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    };

    fetchTransaction();
  }, [transactionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.description ||
      !formData.category ||
      !formData.option ||
      !formData.amount ||
      !formData.location ||
      !formData.date
    ) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all the fields.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    try {
      if (!transactionId) {
        throw new Error("Transaction ID is missing or invalid.");
      }

      const response = await axios.put(
        `https://expense-tracker-api-six.vercel.app/api/update/${transactionId}`,
        formData
      );

      console.log("Server response:", response.data);

      Swal.fire({
        title: "Success!",
        text: "Transaction updated successfully!",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Error updating transaction:", error);

      const errorMessage =
        error.response?.data?.message || "Failed to update transaction.";

      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="h-screen max-w-4xl mx-auto flex flex-col items-center">
      <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
        Update this transaction
      </p>
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
              placeholder="Rent, Groceries, Salary, etc."
              value={formData.description}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="category"
            >
              Payment Type
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="category"
                name="category"
                onChange={handleInputChange}
                value={formData.category}
              >
                <option value="">Select Category</option>
                <option value="saving">Saving</option>
                <option value="expense">Expense</option>
                <option value="investments">Investments</option>
              </select>
            </div>
          </div>
          <div className="w-full flex-1 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-white text-xs font-bold mb-2"
              htmlFor="option"
            >
              Category
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="option"
                name="option"
                onChange={handleInputChange}
                value={formData.option}
              >
                <option value="">Select Options</option>
                <option value="education">Education</option>
                <option value="health">Health</option>
                <option value="subscriptions">Subscriptions</option>
                <option value="clothing">Clothing</option>
                <option value="travelling">Travelling</option>
                <option value="others">Others</option>
              </select>
            </div>
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
              value={formData.amount}
              onChange={handleInputChange}
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
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="location"
              name="location"
              type="text"
              placeholder="Hyderabad"
              value={formData.location}
              onChange={handleInputChange}
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
              className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-[11px] px-4 mb-3 leading-tight focus:outline-none
              focus:bg-white"
              placeholder="Select date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button
          className="text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br
          from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600"
          type="submit"
        >
          Update Expense
        </button>
      </form>
    </div>
  );
};

export default TransactionPage;
