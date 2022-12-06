import { useState, useContext } from "react";

import { userContext } from "../../App";

const AddBorrower = (props) => {
  const { users } = useContext(userContext);
  const [borrowerId, setBorrowerId] = useState();

  return (
    <div className="borrower-field">
      <div className="form-field">
        <h3>Shared by</h3>
        <select
          className="form-select"
          name="borrower name"
          onChange={(event) => setBorrowerId(event.target.value)}
        >
          <option>Select Friend</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <button
          className="btn btn-form"
          onClick={() => props.setDataBorrower(borrowerId)}
        >
          Add Friend
        </button>
      </div>
    </div>
  );
};

export default AddBorrower;
