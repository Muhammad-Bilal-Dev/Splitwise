import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { db, auth } from "../../firebase-config";
import { currentUserAuthIdContext } from "../../App";

import "./Login.css"
import Toast from "../tostify/Toast";

const Login = () => {
  const { setCurrentUserAuthId } = useContext(currentUserAuthIdContext);

  const [ data, setData ] = useState({
    auth_user_id: "",
    name: "",
    phone: "",
    username: "",
    email: "",
    password: ""
  });

  const [ loginData, setLoginData ] = useState({
    email: "",
    password: ""
  });

  const nav = useNavigate();

  const changeHandlerData = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const changeHandlerLoginData = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const createUserToFirebaseDB = async (event) => {
    event.preventDefault()

    await createUserWithEmailAndPassword(
      auth, data.email, data.password
    ).then((response) => {
      addDoc(collection(db, "users"), {
        auth_user_id: response.user.uid,
        name: data.name,
        phone: data.phone,
        username: data.username,
        email: data.email,
        password: data.password
      }).then((response) => {
        Toast("success", "User Created.");
        setData({ auth_user_id: "", name: "", phone: "", username: "", email: "", password: "" });
      }).catch((error) => {
        Toast("danger", error.message);
      });
    }).catch((error) => {
      Toast("danger", error.message);
    });
  }

  const loginAuthUser = async (event) => {
    event.preventDefault()
    await signInWithEmailAndPassword(
      auth, loginData.email, loginData.password
    ).then((response) => {
      Toast("success", "Successfully Loged In");
      setCurrentUserAuthId(response.user.uid);
      nav("/show_expense");
    }).catch((error) => {
      Toast("danger", error.message);
    })
  }

  return (
    <div className="main-head">
      <div className="main">  
        <input type="checkbox" id="chk" aria-hidden="true" />
          <div className="signup">
            <form onSubmit={ createUserToFirebaseDB }>
            <label htmlFor="chk" aria-hidden="true">Sign up</label>
              <input onChange={ changeHandlerData } value={ data.name } type="text" name="name" placeholder="Name" required="" />
              <input onChange={ changeHandlerData } value={ data.phone } type="text" name="phone" placeholder="Phone" required="" />
              <input onChange={ changeHandlerData } value={ data.username } type="text" name="username" placeholder="User name" required="" />
              <input onChange={ changeHandlerData } value={ data.email } type="email" name="email" placeholder="Email" required="" />
              <input onChange={ changeHandlerData } value={ data.password } type="password" name="password" placeholder="Password" required="" />
              <button typye="submit">Sign up</button>
            </form>
          </div>
          <div className="login">
            <form onSubmit={ loginAuthUser }>
              <label htmlFor="chk" aria-hidden="true">Login</label>
              <input onChange={ changeHandlerLoginData } value={loginData.email} type="email" name="email" placeholder="Email" required="" />
              <input onChange={ changeHandlerLoginData } value={loginData.password} type="password" name="password" placeholder="Password" required="" />
              <button typye="submit">Login</button>
            </form>
          </div>
      </div>
    </div>
  )
}

export default Login
