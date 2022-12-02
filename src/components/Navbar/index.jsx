import { Outlet, Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  const linkList = [
    { title: "Add Expense", path: "/create_expense" },
    { title: "Show Expense", path: "/show_expense" },
    { title: "Users", path: "/users" },
    { title: "Login", path: "/login" },
  ];

  return (
    <>
      <nav className="navbar">
        <div className="logo">SPLITWISE</div>
        <ul className="nav-links">
          <input type="checkbox" id="checkbox_toggle" />
          <label htmlFor="checkbox_toggle" className="hamburger">
            &#9776;
          </label>
          <div className="menu">
            {linkList.map((obj, index) => (
              <Link key={index} to={obj.path}>
                {obj.title}
              </Link>
            ))}
          </div>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
