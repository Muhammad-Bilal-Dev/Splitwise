import { useState, useContext, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";

import { db } from "../../firebase-config";
import AddBorrower from "./AddBorrower";
import { userContext } from "../../App";
import Input from "../Elements/Input";

import "./Expense.css";

const CreateExpense = () => {
  const [data, setData] = useState({ description: "", totalBill: 0 });

  const [payerId, setPayerId] = useState("");
  const [payerBill, setPayerBill] = useState(0);

  const [borrowerTotalBill, setBorrowerTotalBill] = useState(0);
  const [borrowers, setBorrowers] = useState([]);
  const { users } = useContext(userContext);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const canSubmitFirebase = () => {
    if (data.description === "") {
      alert("Description can not be empty");
    } else if (data.totalBill <= 0 || data.totalBill === "") {
      alert("Total Bill Invalid");
    } else if (payerId === "") {
      alert("Please Select Paid by");
    } else if (+data.totalBill !== borrowerTotalBill) {
      alert("Total Bill shuold be equal to Shared Bill");
    } else {
      console.log("Local checks passed.");
      setDataFirebase();
    }
  };

  const canBeSubmitFirebase = () => {
    if (data.description === "") {
      return false;
    } else if (data.totalBill <= 0 || data.totalBill === "") {
      return false;
    } else if (payerId === "") {
      return false;
    } else if (+data.totalBill !== borrowerTotalBill) {
      return false;
    } else {
      return true;
    }
  };

  const setDataFirebase = async () => {
    await addDoc(collection(db, "expense"), {
      description: data.description,
      total_bill: Number(data.totalBill),
      payer_bill: Number(payerBill),
      payer_id: payerId,
      image: "url",
      date: new Date().toLocaleString(),
    })
      .then((response) => {
        console.log("Created expense", response);
        const expense_id = response.id;
        for (let i = 0; i < borrowers.length; i++) {
          if (payerId !== borrowers[i].id) {
            addDoc(collection(db, "expense_ledger"), {
              expense_id: expense_id,
              payer_id: payerId,
              borrower_id: borrowers[i].id,
              borrowed_amount: borrowers[i].loan,
              paid_status: 0,
            })
              .then((response) => {
                console.log("Created expense ledger", response);
              })
              .catch((error) => {
                console.log("Error: While creating expense_ledger", error);
              });
          }
        }
      })
      .catch((error) => {
        console.log("Error: While creating expense", error);
      });
  };

  const emptyAllStates = () => {
    setData({ description: "", totalBill: 0 })
    setPayerId("")
    setPayerBill(0)
    setBorrowerTotalBill(0)
    setBorrowers([])
  }

  const setDataBorrower = (borrowerId) => {
    if (borrowerId) {
      if (borrowers.filter((obj) => obj.id === borrowerId).length === 0) {
        const borrower = users.filter((obj) => obj.id === borrowerId);
        setBorrowers([...borrowers, ...borrower]);
      } else {
        alert("This friend already added.");
      }
    } else {
      alert("Friend can not blank.");
    }
  };

  const AddBorrowerBill = (event, borrowerId) => {
    setBorrowers(
      borrowers.map((obj) => {
        if (obj.id === borrowerId) {
          if (payerId === borrowerId) {
            setPayerBill(event.target.value);
          }
          return { ...obj, loan: event.target.value };
        }
        return { ...obj };
      })
    );
  };

  const dividingEqually = () => {
    const total_b = borrowers.length;
    setBorrowers(
      borrowers.map((obj) => {
        return { ...obj, loan: data.totalBill / total_b };
      })
    );
  };

  useEffect(() => {
    let val = 0;
    borrowers?.map((obj) => (val = val + Number(obj.loan ? obj.loan : 0)));
    setBorrowerTotalBill(val);
  }, [borrowers]);

  return (
    <>
      <footer id="site-footer">
        <div className="container clearfix">
          <div className="left">
            <h2 className="subtotal">
              Total Bill: {data.totalBill}
              {canBeSubmitFirebase() ? (
                <span className="can-submit">Can be Submit</span>
              ) : (
                <span className="can-not-submit">Can not Submit</span>
              )}
            </h2>
            <h2 className="subtotal">Shared Bill: {borrowerTotalBill}</h2>
            <button className="button-73" onClick={dividingEqually}>
              Divide Equally
            </button>
          </div>
          <div className="right">
            <h1 className="total">
              Total Users: <span>{users.length}</span>
            </h1>
            <button className="btn" onClick={canSubmitFirebase}>
              Save Changes
            </button>
          </div>
        </div>
      </footer>
      <div className="form-container">
        <div className="form-inner-container">
          <h1 className="form-heading">Add an Expense</h1>
          <div className="borrower-field">
            <Input
              title="Description"
              name="description"
              value={data.description}
              type="text"
              placeholder="Description..."
              onChange={changeHandler}
            />
            <Input
              title="Total Bill"
              name="totalBill"
              value={data.totalBill}
              type="number"
              placeholder="Total Bill..."
              onChange={changeHandler}
            />
            <div className="form-field">
              <h3 className="">Paid By</h3>
              <select
                className="form-select"
                name="Payer Name"
                onChange={(event) => {
                  setPayerId(event.target.value);
                }}
              >
                <option>Select Paid By</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <AddBorrower setDataBorrower={setDataBorrower} />
          {borrowers?.map(borrower => (
            <div key={borrower.id}>
              <div className="form-field">
                <h2 className="">{borrower.name}</h2>
                <input
                  value={borrower.loan}
                  type="number"
                  className="form-input"
                  placeholder="Total Bill..."
                  onChange={(event) => AddBorrowerBill(event, borrower.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CreateExpense;
