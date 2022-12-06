import { Outlet, Link } from "react-router-dom";
import { auth } from "../../firebase-config";

import "./Navbar.css";

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
            {auth.currentUser
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
