import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Toast = (type, title) => {
  if (type === "success") {
    toast.success(title, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  } else if (type === "danger") {
    toast.error(title, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
};

export default Toast;
