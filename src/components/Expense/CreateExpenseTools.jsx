import { useState } from "react";

const Borrower = (props) => {
  const [borrowerId, setBorrowerId] = useState(0);
  const [borrowedAmount, setBorrowedAmount] = useState(0);

  return (
    <>
      <input
        value={borrowerId}
        placeholder="borrower_id..."
        onChange={(event) => {
          setBorrowerId(event.target.value);
        }}
      />
      <input
        value={borrowedAmount}
        placeholder="borrowed_amount..."
        onChange={(event) => {
          setBorrowedAmount(event.target.value);
        }}
      />
      <button onClick={() => props.setDataBorrower(borrowerId, borrowedAmount)}>
        Add
      </button>
    </>
  );
};

export default Borrower;
