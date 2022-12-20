import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";

import { auth } from "../../firebase-config";
import { currentUserAuthIdContext } from "../../App";
import { setEmpty } from "../Users/userSlice";

const Logout = () => {
  const nav = useNavigate();

  const { setCurrentUserAuthId } = useContext(currentUserAuthIdContext);
  const dispatch = useDispatch();

  const logout = async () => {
    await signOut(auth);
    dispatch(setEmpty());
    setCurrentUserAuthId("");
    nav("/home");
  };

  useEffect(() => {
    logout();
  }, []);

  return <></>;
};

export default Logout;
