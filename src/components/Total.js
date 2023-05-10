import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Total = () => {
  const [percentage, setPercentage] = useState(0);

  const totalBudget = useSelector((state) => state.budget.totalBudget);
  const totalExpenses = useSelector((state) => state.budget.totalExpenses);

  useEffect(() => {
    setPercentage((totalExpenses / totalBudget) * 100);
  }, [totalBudget, totalExpenses]);

  return (
    <div className="flex items-center space-x-4">
      <span className="font-bold text-2xl">Total</span>
      <div className="w-full h-6 rounded-lg border-2 flex items-center my-7">
        <div
          className="bg-blue-700 h-5 rounded-md"
          style={{
            width: `${percentage}%`,
            backgroundColor:
              percentage < 50 ? "blue" : percentage < 75 ? "yellow" : "red",
          }}
        ></div>
      </div>

      <div className="flex items-baseline">
        <span className="text-3xl">${totalExpenses}</span>/
        <span>${totalBudget}</span>
      </div>
    </div>
  );
};

export default Total;
