import React, { useState } from "react";
import AddBudgetModal from "../components/AddBudgetModal";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="py-4 px-4 flex w-full justify-between items-center shadow-md">
      <h1 className="text-4xl font-bold">Budgets</h1>
      <div className="flex space-x-1">
        <button
          onClick={() => setOpen(true)}
          className="py-2 px-3 bg-blue-700 text-white rounded hover:bg-blue-500"
        >
          Add Budget
        </button>
      </div>
      {open && <AddBudgetModal setOpen={setOpen} />}
    </header>
  );
};

export default Header;
