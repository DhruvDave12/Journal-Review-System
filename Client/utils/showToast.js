import { toast } from "react-toastify";
export const showToast = (message, type) => {
  toast(message, {
    type: type,
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  });
};
