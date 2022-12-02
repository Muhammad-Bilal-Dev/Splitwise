import { useState, useEffect, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../../firebase-config";
import { userContext } from "../../App";

import "../Users/User.css";

const Expense = () => {
  const [expense, setExpense] = useState([]);
  const [ledger, setLedger] = useState([]);

  const { users } = useContext(userContext);
  const [currentUser, setCurrentUser] = useState(users[0]);

  const getCurrentUserTotalOwe = () => {
    var owe = 0;
    ledger.map((obj) => {
      if (obj.borrower_id === currentUser.id && obj.paid_status === 0)
        owe = owe + +obj.borrowed_amount;
    });
    return owe;
  };

  const getCurrentUserTotalOwed = () => {
    var owed = 0;
    ledger.map((obj) => {
      if (obj.payer_id === currentUser.id && obj.paid_status === 0)
        owed = owed + +obj.borrowed_amount;
    });
    return owed;
  };

  const getCurrentUserTotalBalance = () => {
    return getCurrentUserTotalOwed() - getCurrentUserTotalOwe();
  };

  const getUserById = (userId) => {
    return users.filter((obj) => obj.id === userId)[0];
  };

  const getAllExpenseLedgerByExpenseId = (expenseId) => {
    return ledger.filter((obj) => obj.expense_id === expenseId);
  };

  const getUnpaidExpenseLedgerByExpenseId = (expenseId) => {
    return ledger.filter(
      (obj) => obj.expense_id === expenseId && obj.paid_status === 0
    );
  };

  const getSumOfUnpaidExpenseLedgerByExpenseId = (expenseId) => {
    const responseData = getUnpaidExpenseLedgerByExpenseId(expenseId);
    var sum = 0;
    responseData.map((obj) => (sum = sum + +obj.borrowed_amount));
    return sum;
  };

  const convertStatusToString = (status) => {
    return status === 1 ? "True" : "False";
  };

  useEffect(() => {
    const getUserData = async () => {
      const data = await getDocs(collection(db, "expense"));
      setExpense(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const ledger_data = await getDocs(collection(db, "expense_ledger"));
      setLedger(ledger_data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUserData();
  }, []);

  return (
    <>
      <footer id="site-footer">
        <div className="container clearfix">
          <div className="left">
            <div className="content">
              <h1 className="subtotal">{currentUser?.name}</h1>
            </div>
            <h2>Total balance: ${getCurrentUserTotalBalance()}</h2>
          </div>
          <div className="right">
            <h1 className="total"></h1>
            <Link to="/create_expense" className="btn">
              Add an Expense
            </Link>
          </div>
        </div>
        <div className="container clearfix">
          <div className="dashboard_expense">
            <div className="dashboard_expense_left">
              <h2>YOU OWE</h2>
              <h3>${getCurrentUserTotalOwe()}</h3>
            </div>
            <div className="dashboard_expense_right">
              <h2>YOU ARE OWED</h2>
              <h3>${getCurrentUserTotalOwed()}</h3>
            </div>
          </div>
        </div>
      </footer>

      <div>
        {expense?.map((expense) => (
          <div key={expense.id}>
            <div className="container">
              <section id="cart">
                <article className="product">
                  <header>
                    <div className="remove">
                      <h3>Remove User</h3>
                    </div>
                  </header>
                  <div className="content">
                    <h1>
                      {expense.description} (Paid by:{" "}
                      {getUserById(expense.payer_id)?.name})
                    </h1>
                    Total Owed: $
                    {getSumOfUnpaidExpenseLedgerByExpenseId(expense.id)}
                    {getAllExpenseLedgerByExpenseId(expense.id).map(
                      (expense_ledger) => (
                        <div key={expense_ledger.id}>
                          <b>Owed:</b> ${expense_ledger.borrowed_amount} from{" "}
                          {getUserById(expense_ledger.borrower_id)?.name}
                          <b> Paid status:</b>{" "}
                          {convertStatusToString(expense_ledger.paid_status)}
                        </div>
                      )
                    )}
                  </div>
                  <footer className="content">
                    <span className="qt">
                      Total Bill: ${expense.total_bill}
                    </span>
                  </footer>
                </article>
              </section>
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </>
  );
};

export default Expense;