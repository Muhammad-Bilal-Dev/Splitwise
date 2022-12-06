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

export const userContext = createContext();

const App = () => {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const getUserData = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <userContext.Provider value={{ users, setUsers }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}> 
            <Route path="home" element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="create_expense" element={<CreateExpense />} />
            <Route path="show_expense" element={<Expense />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
};

export default App;
