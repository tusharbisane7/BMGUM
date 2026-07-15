import { useEffect, useState } from "react";
import axios from "axios";

import ExpenseTable from "../components/ExpenseTable";
import "../styles/expense.css";

function Expense() {

  const [summary, setSummary] = useState({

    totalExpense: 0,

    todayExpense: 0,

    totalEntries: 0

  });

  const [loading, setLoading] = useState(true);

  const loadSummary = async () => {

    try {

      const res = await axios.get(

        "https://bmgum.onrender.com/api/expenses/summary"

      );

      setSummary(res.data);

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    loadSummary();

    const interval = setInterval(() => {

      loadSummary();

    }, 2000);

    return () => clearInterval(interval);

  }, []);

  if (loading) {

    return (

      <div className="container">

        <h2>माहिती लोड होत आहे...</h2>

      </div>

    );

  }

  return (

    <section className="container donation-page">

      <h1 className="title">

        💸 खर्च

      </h1>

      <div className="top-cards">

        <div className="top-card">

          <h3>एकूण खर्च</h3>

          <h2>

            ₹ {summary.totalExpense.toLocaleString()}

          </h2>

        </div>

        <div className="top-card">

          <h3>आजचा खर्च</h3>

          <h2>

            ₹ {summary.todayExpense.toLocaleString()}

          </h2>

        </div>

        <div className="top-card">

          <h3>एकूण नोंदी</h3>

          <h2>

            {summary.totalEntries}

          </h2>

        </div>

      </div>

      <ExpenseTable />

    </section>

  );

}

export default Expense;