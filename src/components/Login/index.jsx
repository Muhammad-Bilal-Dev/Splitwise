import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";

import { db } from "../../firebase-config";

import "./Login.css"

const Login = () => {
  const [ data, setData ] = useState(
    {
      name: "",
      phone: "",
      username: "",
      email: "",
      password: ""
    });

  const changeHandlerData = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const createUserToFirebaseDB = async (event) => {
    console.log("User Creating")
    event.preventDefault()
    await addDoc(collection(db, "users"), {
      name: data.name,
      phone: data.phone,
      username: data.username,
      email: data.email,
      password: data.password
    }).then((response) => {
      console.log("User Created", response)
      setData({ name: "", phone: "", username: "", email: "", password: "" });
    }).catch((error) => {
      console.log("Error: while creating user.", error.message)
    });
  }

  return (
    <>
      <div className="main_head">
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
              <form>
                <label htmlFor="chk" aria-hidden="true">Login</label>
                <input type="email" name="email" placeholder="Email" required="" />
                <input type="password" name="pswd" placeholder="Password" required="" />
                <button>Login</button>
              </form>
            </div>
        </div>
      </div>
    </>
  )
}

export default Login
