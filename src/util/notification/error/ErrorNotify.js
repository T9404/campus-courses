import {toast} from "react-toastify";

const notifyError = (message) => {
    toast.error(`${message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: 'success1',
    });
};

export default notifyError;