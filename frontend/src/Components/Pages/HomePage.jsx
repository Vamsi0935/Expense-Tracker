import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import TransactionForm from "./TransactionForm";
import Cards from "./Cards";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "₹",
        data: [],
        backgroundColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
        ],
        borderColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 120,
      },
    ],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategoryStatistics = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://expense-tracker-api-six.vercel.app/api/transactions/categoryStatistics"
        );
        const categories = response.data.map((item) => item.category);
        const amounts = response.data.map((item) => item.totalAmount);

        setChartData({
          labels: categories,
          datasets: [
            {
              label: "₹",
              data: amounts,
              backgroundColor: [
                "rgba(199,34,106,255)", //Expense background color
                "rgba(58,194,108,255)", //Savings background color
                "rgba(111,120,133,255)", //Investments background color
              ],
              borderColor: [
                "rgba(199,34,106,255)",
                "rgba(58,194,108,255)",
                "rgba(111,120,133,255)",
              ],
              borderWidth: 1,
              borderRadius: 30,
              spacing: 10,
              cutout: 120,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching category statistics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryStatistics();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
        <div className="flex items-center">
          <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
            Spend wisely, track wisely
          </p>
          {loading && (
            <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin"></div>
          )}
        </div>
        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]">
            <Doughnut data={chartData} />
          </div>
          <TransactionForm />
        </div>
        <Cards />
      </div>
    </>
  );
};

export default HomePage;
