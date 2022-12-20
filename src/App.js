import { createContext, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

import { db } from "./firebase-config";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Logout from "./components/Login/Logout";
import Users from "./components/Users";
import Expense from "./components/Expense";
import CreateExpense from "./components/Expense/CreateExpense";
import Home from "./components/Home"
import PageNotFound from "./components/Error/PageNotFount";
import ToastComponent from "./components/tostify/ToastComponent";

export const userContext = createContext();
export const currentUserAuthIdContext = createContext();

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUserAuthId, setCurrentUserAuthId] = useState('');

  const usersCollectionRef = collection(db, "users");

  const getUserData = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (<>
    <userContext.Provider value={{ users, setUsers }}>
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
    </userContext.Provider>
    {ToastComponent()}
  </>);
};

export default App;
