import {toast} from "react-toastify";

const notifyWarning = (message) => {
    toast.warning(`${message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: 'success1',
    });
};

export default notifyWarning;