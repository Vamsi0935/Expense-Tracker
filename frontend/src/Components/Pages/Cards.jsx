import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import Swal from "sweetalert2";

const Cards = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/list");
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Error fetching transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleDelete = async (transactionId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/delete/${transactionId}`);

        setTransactions((prevTransactions) =>
          prevTransactions.filter(
            (transaction) => transaction._id !== transactionId
          )
        );

        Swal.fire("Deleted!", "Your transaction has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting transaction:", error);
        setError("Error deleting transaction");

        Swal.fire(
          "Error!",
          "There was a problem deleting your transaction.",
          "error"
        );
      }
    }
  };

  if (loading) {
    return <p className="text-center text-2xl">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">Transactions</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {transactions.map((transaction) => (
          <Card
            key={transaction._id}
            cardType={transaction.type}
            transactionId={transaction._id}
            description={transaction.description}
            amount={transaction.amount}
            category={transaction.category}
            option={transaction.option}
            location={transaction.location}
            date={transaction.date}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default Cards;
