import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";

import { auth } from "../../firebase-config";
import { setEmpty } from "../Users/userSlice";
import { setEmptyCurrentUserAuthId } from "../Users/currentUserSlice";

const Logout = () => {
  const nav = useNavigate();

  const dispatch = useDispatch();

  const logout = async () => {
    await signOut(auth);
    dispatch(setEmpty());
    dispatch(setEmptyCurrentUserAuthId())
    nav("/home");
  };

  useEffect(() => {
    logout();
  }, []);

  return <></>;
};

export default Logout;
