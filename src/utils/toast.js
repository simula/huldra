import { toast } from "react-toastify";

const toastSuccess = (message, position, toastId) => {
  toast.success(message, {
    position: position,
    autoClose: 2000,
    toastId: toastId,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};

const toastError = (message, position, toastId) => {
  toast.error(message, {
    position: position,
    autoClose: 2000,
    hideProgressBar: true,
    toastId: toastId,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};
const toastInfo = (message, position, toastId) => {
  toast.info(message, {
    position: position,
    autoClose: 2000,
    toastId: toastId,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};
export { toastSuccess, toastError, toastInfo };
