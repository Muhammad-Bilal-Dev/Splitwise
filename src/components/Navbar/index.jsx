import { useContext } from 'react';
import { Outlet, Link } from "react-router-dom";

import "./Navbar.css";
import { currentUserAuthIdContext } from "../../App";


const Navbar = () => {
  const logedInNavItem = [
    { title: "Expense", path: "/show_expense" },
    { title: "Add Expense", path: "/create_expense" },
    { title: "Users", path: "/users" },
    { title: "Logout", path: "/logout" }
  ];

  const logedOutNavItem = [
    { title: "Home", path: "/home" },
    { title: "Login", path: "/login" }
  ];

  const { currentUserAuthId } = useContext(currentUserAuthIdContext)

  return (
    <>
      <nav className="navbar">
        <Link className="logo" to="/home">SPLITWISE</Link>
        <ul className="nav-links">
          <input type="checkbox" id="checkbox_toggle" />
          <label htmlFor="checkbox_toggle" className="hamburger">
            &#9776;
          </label>
          <div className="menu">
            {currentUserAuthId
              ? logedInNavItem.map((obj, index) => (
                  <Link key={index} to={obj.path}>
                    {obj.title}
                  </Link>
                ))
              : logedOutNavItem.map((obj, index) => (
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
