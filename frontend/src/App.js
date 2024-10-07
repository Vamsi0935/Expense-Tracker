import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/Pages/HomePage";
import NotFoundPage from "./Components/Pages/NotFoundPage";
import TransactionPage from "./Components/Pages/TransactionPage";
import Header from "./Components/UI/Header";
import Card from "./Components/Pages/Card";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/transaction/:transactionId"
            element={<TransactionPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
