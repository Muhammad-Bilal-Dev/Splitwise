import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../../firebase-config";

const LogOut = () => {
  const nav = useNavigate();

  useEffect(() => {
    const logOut = async () => {
      await signOut(auth);
      nav("/home");
    };

    logOut();
  }, []);

  return <></>;
};

export default LogOut;
