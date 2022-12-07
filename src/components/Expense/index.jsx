import { useState, useEffect, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase-config";
import { userContext } from "../../App";
import { currentUserAuthIdContext } from "../../App";

import "../Users/User.css";

const Expense = () => {
  const [expense, setExpense] = useState([]);
  const [ledger, setLedger] = useState([]);

  const { users } = useContext(userContext);
  const { currentUserAuthId } = useContext(currentUserAuthIdContext);

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    setCurrentUser(getUserByCurrentUserAuthId(currentUserAuthId));
  }, [currentUserAuthId])

  const getCurrentUserTotalOwe = () => {
    let owe = 0;
    ledger.map(obj => {
      if (obj.borrower_id === currentUser?.id && obj.paid_status === 0)
        owe = owe + +obj.borrowed_amount;
    });
    return owe;
  };

  const getCurrentUserTotalOwed = () => {
    let owed = 0;
    ledger.map(obj => {
      if (obj.payer_id === currentUser?.id && obj.paid_status === 0)
        owed = owed + +obj.borrowed_amount;
    });
    return owed;
  };

  const getCurrentUserTotalBalance = () => {
    return getCurrentUserTotalOwed() - getCurrentUserTotalOwe();
  };

  const getUserById = (userId) => {
    return users?.filter(obj => obj?.id === userId)[0];
  };

  const getUserByCurrentUserAuthId = (authId) => {
    return users?.filter(obj => obj?.auth_user_id === authId)[0];
  }

  const getExpenseById = (expenseId) => {
    return expense?.filter(obj => obj.id === expenseId)[0];
  };

  const getAllExpenseLedgerByExpenseId = (expenseId) => {
    return ledger.filter(obj => obj.expense_id === expenseId);
  };

  const getUnpaidExpenseLedgerByExpenseId = (expenseId) => {
    return ledger.filter(
      obj => obj.expense_id === expenseId && obj.paid_status === 0
    );
  };

  const getSumOfUnpaidExpenseLedgerByExpenseId = (expenseId) => {
    const responseData = getUnpaidExpenseLedgerByExpenseId(expenseId);
    let sum = 0;
    responseData.map(obj => (sum = sum + +obj.borrowed_amount));
    return sum;
  };

  const convertStatusToString = (status) => {
    return status === 1 ? "True" : "False";
  };
  
  const getOweLedgerOfCurrentUser = () => {
    return ledger?.filter(
      obj => obj.borrower_id === currentUser?.id && obj.paid_status === 0
    );
  };

  const getOwedLedgerOfCurrentUser = () => {
    return ledger?.filter(
      obj => obj.payer_id === currentUser?.id && obj.paid_status === 0
    );
  };

  const updateDateFirebase = async (id) => {
    await updateDoc(doc(db, "expense_ledger", id), {paid_status: 1})
  };

  const getUserData = async () => {
    const data = await getDocs(collection(db, "expense"));
    setExpense(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    const ledger_data = await getDocs(collection(db, "expense_ledger"));
    setLedger(ledger_data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUserData();
  }, [expense, ledger]);

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
          <div className="dashboard-expense">
            <div className="dashboard-expense-left">
              <h2>YOU OWE</h2>
              <h3>${getCurrentUserTotalOwe()}</h3>
            </div>
            <div className="dashboard-expense-right">
              <h2>YOU ARE OWED</h2>
              <h3>${getCurrentUserTotalOwed()}</h3>
            </div>
          </div>
        </div>
      </footer>

      <div className="dashboard-expense">
        <div className="dashboard-expense-left">
          <h2>YOU OWE</h2>
          <div>
            {getOweLedgerOfCurrentUser().map(obj => 
              <div>
                <h3>
                  $ {obj.borrowed_amount} to {getUserById(obj.payer_id).name} ({getExpenseById(obj.expense_id).description})
                  <button className="btn-settle-up" onClick={() => updateDateFirebase(obj.id)}>Settle-up</button>
                </h3>
              </div>
            )}
          </div>
        </div>
        <div className="dashboard-expense-right">
          <h2>YOU ARE OWED</h2>
          <div>
            {getOwedLedgerOfCurrentUser().map(obj => 
              <div>
                <h3>$ {obj.borrowed_amount} from {getUserById(obj.borrower_id).name}</h3>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        {expense?.map(expense => (
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
                      expense_ledger => (
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
