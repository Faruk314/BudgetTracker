import React from "react";
import { useDispatch } from "react-redux";
import { budgetActions } from "../features/budgetSlice";
import { useSelector } from "react-redux";

const ViewExpensesModal = ({ id, setOpenExpenses }) => {
  const dispatch = useDispatch();

  const expenses = useSelector(
    (state) => state.budget.budgets.find((budget) => budget.id === id).expenses
  );

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="h-max bg-white rounded-md px-3 py-2 my-4">
        <div className="flex justify-between space-x-4 items-center">
          <h2 className="text-2xl">Expenses</h2>

          {expenses.length > 0 && (
            <button
              onClick={() => dispatch(budgetActions.clearExpenses({ id }))}
              className="py-2 px-4 w-max bg-red-700 text-1xl text-white rounded hover:bg-red-400"
            >
              Clear all
            </button>
          )}

          <button onClick={() => setOpenExpenses(false)} className="text-2xl">
            X
          </button>
        </div>

        <div className="mt-4 flex flex-col space-y-5">
          {expenses.length === 0 && (
            <p className="text-blue-700">You dont have any expenses</p>
          )}
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex justify-between items-center shadow-md py-2 px-2"
            >
              <h3 className="text-2xl">{expense.desc}</h3>
              <div className="flex space-x-2">
                <span className="text-2xl">${expense.amount}</span>
                <button
                  onClick={() =>
                    dispatch(
                      budgetActions.deleteExpense({
                        id: expense.id,
                        budgetId: id,
                      })
                    )
                  }
                  className="py-1 px-3 bg-red-700 text-white rounded hover:bg-red-400"
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewExpensesModal;
