import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { IoIosOptions } from "react-icons/io";

const categoryColorMap = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
};

const Card = ({
  description,
  amount,
  date,
  category,
  option,
  location,
  handleDelete,
  transactionId,
}) => {
  const categoryColor =
    categoryColorMap[category] || "from-gray-700 to-gray-400";

  return (
    <div
      className={`shadow-md flex flex-col gap-2 p-3 border rounded-lg w-[90%] mx-auto bg-gradient-to-br text-white ${categoryColor}`}
    >
      <div className="flex justify-end gap-2">
        <div className="text-lg font-bold text-center capitalize">
          {category}
        </div>
        <FaTrash
          onClick={() => handleDelete(transactionId)}
          className="cursor-pointer"
        />
        <Link to={`/transaction/${transactionId}`}>
          <HiPencilAlt className="cursor-pointer" />
        </Link>
      </div>
      <div className="flex justify-between">
        <p className="capitalize font-bold flex gap-2 items-center">
          <BsCardText /> Description: {description}
        </p>
      </div>
      <p className="capitalize font-medium flex gap-2 items-center">
        <IoIosOptions /> Expense Options: {option}
      </p>
      <p className="capitalize font-medium flex gap-2 items-center">
        <MdOutlinePayments />
        Amount: ₹{amount}
      </p>
      <p className="capitalize font-medium flex gap-2 items-center">
        <FaLocationDot />
        Location: {location}
      </p>
      <p className="capitalize font-medium flex gap-2 items-center">
        <SlCalender />
        Date: {date}
      </p>
    </div>
  );
};

export default Card;
