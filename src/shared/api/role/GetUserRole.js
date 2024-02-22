import axios from "axios";

const getUserRole = async () => {
    
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/roles`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        });
        if (response.status === 200) {
            console.log('-------------------------------------------------------------------')
            console.log(response.data.isTeacher)
            localStorage.setItem('roles', response.data);
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};

export default getUserRole;