import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Logout from "./components/Login/Logout";
import Users from "./components/Users";
import Expense from "./components/Expense";
import CreateExpense from "./components/Expense/CreateExpense";
import Home from "./components/Home"
import PageNotFound from "./components/Error/PageNotFount";
import ToastComponent from "./components/tostify/ToastComponent";

const App = () => {
  const currentUserAuthId = useSelector(state => state.currentUser).currentUserAuthId

return (<>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          {currentUserAuthId ? (
            <>
              <Route path="users" element={<Users />} />
              <Route path="create_expense" element={<CreateExpense />} />
              <Route path="show_expense" element={<Expense />} />
              <Route path="logout" element={<Logout />} />
            </>
          ) : (
            <>
              <Route path="login" element={<Login />} />
            </>
          )}
          <Route index path="home" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    {ToastComponent()}
  </>);
};

export default App;
