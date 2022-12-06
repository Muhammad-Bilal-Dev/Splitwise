import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../../firebase-config";

const Logout = () => {
  const nav = useNavigate();

  const logout = async () => {
    await signOut(auth);
    nav("/home");
  };

  useEffect(() => {
    logout();
  }, []);

  return <></>;
};

export default Logout;
