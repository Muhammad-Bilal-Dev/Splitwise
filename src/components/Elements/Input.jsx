import "../Expense/Expense.css";

const Input = ({ title, ...rest }) => (
  <div className="form_field">
    <h3 className="">{title}</h3>
    <input className="form_input" {...rest} />
  </div>
);

export default Input;
