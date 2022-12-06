import "../Expense/Expense.css";

const Input = ({ title, ...rest }) => (
  <div className="form-field">
    <h3 className="">{title}</h3>
    <input className="form-input" {...rest} />
  </div>
);

export default Input;
