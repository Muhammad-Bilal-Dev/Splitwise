import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Logout from "./components/Login/Logout";
import Users from "./components/Users";
import Expense from "./components/Expense";
import CreateExpense from "./components/Expense/CreateExpense";
import Home from "./components/Home"
import PageNotFound from "./components/Error/PageNotFount";
import ToastComponent from "./components/tostify/ToastComponent";
import store from "./app/store";

export const userContext = createContext();
export const currentUserAuthIdContext = createContext();

const App = () => {
  const [currentUserAuthId, setCurrentUserAuthId] = useState('');

  return (<>
    <Provider store={store}>
      <currentUserAuthIdContext.Provider
        value={{ currentUserAuthId, setCurrentUserAuthId }}
      >
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
      </currentUserAuthIdContext.Provider>
      </Provider>
    {ToastComponent()}
  </>);
};

export default App;
