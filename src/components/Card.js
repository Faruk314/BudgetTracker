import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { budgetActions } from "../features/budgetSlice";
import { useSelector } from "react-redux";
import AddExpenseModal from "./AddExpenseModal";
import ViewExpensesModal from "./ViewExpensesModal";

const Card = ({ name, maxSpending, id }) => {
  const dispatch = useDispatch();
  const [percentage, setPercentage] = useState(0);
  const [open, setOpen] = useState(false);
  const [openExpenses, setOpenExpenses] = useState(false);

  const cardTotal = useSelector(
    (state) => state.budget.budgets.find((budget) => budget.id === id).cardTotal
  );

  const max = useSelector((state) =>
    state.budget.budgets.find((budget) => budget.id === id)
  ).maxSpending;

  useEffect(() => {
    setPercentage((cardTotal / max) * 100);
  }, [cardTotal, max, percentage]);

  return (
    <div className="flex flex-col py-3 px-3 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">{name}</h2>
        <div className="  ">
          <span className="text-3xl">${cardTotal}/</span>
          <span>${maxSpending}</span>
        </div>
      </div>

      <div className="w-full h-5 rounded-lg border-2 flex items-center my-7">
        <div
          className={`bg-blue-700 h-4 rounded-md`}
          style={{
            width: `${percentage}%`,
            backgroundColor:
              percentage < 50 ? "blue" : percentage < 75 ? "yellow" : "red",
          }}
        ></div>
      </div>

      <div className="space-x-2">
        <button
          onClick={() => setOpen(true)}
          className="py-2 px-2 bg-blue-700 text-white rounded hover:bg-blue-500"
        >
          Add Expense
        </button>
        <button
          onClick={() => setOpenExpenses(true)}
          className="py-2 px-2 bg-blue-700 text-white rounded hover:bg-blue-500"
        >
          View Expenses
        </button>

        <button
          className="px-2 py-2 bg-red-500 rounded-md text-white hover:bg-red-400"
          onClick={() =>
            dispatch(budgetActions.deleteBudget({ id, cardTotal, maxSpending }))
          }
        >
          Delete
        </button>
      </div>
      {open && <AddExpenseModal id={id} setOpen={setOpen} />}
      {openExpenses && (
        <ViewExpensesModal id={id} setOpenExpenses={setOpenExpenses} />
      )}
    </div>
  );
};

export default Card;
