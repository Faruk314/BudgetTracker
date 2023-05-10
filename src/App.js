import Header from "./components/Header";
import Card from "./components/Card";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import Total from "./components/Total";

function App() {
  const budgets = useSelector((state) => state.budget.budgets);

  return (
    <Fragment>
      <Header />
      <section className="space-y-5 px-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-x-3">
        {budgets.length === 0 && (
          <p className="text-blue-700">You dont have any budgets</p>
        )}
        {budgets.map((budget) => (
          <Card
            key={budget.id}
            name={budget.name}
            maxSpending={budget.maxSpending}
            id={budget.id}
          />
        ))}
      </section>
      {budgets.length > 0 && (
        <section className="mx-auto px-4 py-5 w-5/6 md:w-3/4 lg:w-1/2 lg:mx-2">
          <Total />
        </section>
      )}
    </Fragment>
  );
}

export default App;
