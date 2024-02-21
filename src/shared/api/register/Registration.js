import axios from "axios";
import statusErrorMessages from "../../../util/notification/error/StatusErrorMessages";
import parseAllErrors from "../../../util/notification/error/ParseAllErrors";

const register = async (form) => {
    try {
        // print form
        console.log(form);
        
        const response = await axios.post(`${process.env.REACT_APP_API}/registration`, {
            fullName: form.fullName,
            email: form.email,
            password: form.password,
            confirmPassword: form.confirmPassword,
            birthDate: form.birthDate,
        });
        
        console.log(response)
        
        if (response.status === 200) {
            return response.data;
        } else {
            const errorMessage = statusErrorMessages[response.status] || `Unexpected status code: ${response.status}`;
            return Promise.reject(Error(errorMessage));
        }
    } catch (error) {
        throw new Error(parseAllErrors(error));
    }
}

export default register;
