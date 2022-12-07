import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../../firebase-config";
import { currentUserAuthIdContext, userContext } from "../../App";

const Logout = () => {
  const nav = useNavigate();

  const { setUsers } = useContext(userContext);
  const { setCurrentUserAuthId } = useContext(currentUserAuthIdContext);

  const logout = async () => {
    await signOut(auth);
    setUsers([]);
    setCurrentUserAuthId("");
    nav("/home");
  };

  useEffect(() => {
    logout();
  }, []);

  return <></>;
};

export default Logout;
