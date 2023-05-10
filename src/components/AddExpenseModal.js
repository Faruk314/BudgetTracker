import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { budgetActions } from "../features/budgetSlice";

const AddExpenseModal = ({ setOpen, id }) => {
  const dispatch = useDispatch();
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const expense = {
      id: Math.random(),
      budgetId: id,
      desc: desc,
      amount: parseInt(amount),
    };

    dispatch(budgetActions.addExpense(expense));
    setOpen(false);
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="h-max bg-white rounded-md px-3 py-2 my-4">
        <div className="flex justify-between">
          <h2 className="text-2xl">New Expense</h2>
          <button onClick={() => setOpen(false)} className="text-2xl">
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col my-5">
          <label className="mt-5" htmlFor="desc">
            Description
          </label>
          <input
            onChange={(e) => setDesc(e.target.value)}
            className="border-2 w-4/4 py-1"
            type="text"
            id="desc"
          ></input>

          <label className="mt-5" htmlFor="amount">
            Amount
          </label>
          <input
            onChange={(e) => setAmount(e.target.value)}
            className="border-2 w-4/4 py-1"
            type="text"
            id="amount"
          ></input>

          <button
            disabled={!desc || !amount ? true : false}
            className="py-2 mt-4 px-4 w-max bg-blue-700 text-1xl text-white rounded hover:bg-blue-500 disabled:bg-gray-500"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
