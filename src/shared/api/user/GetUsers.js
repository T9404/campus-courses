import axios from "axios";

const GetUsers = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/users`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        });
        
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 401) {
            return Promise.reject(Error('Вы не авторизованы'));
        }
    } catch (error) {
        throw error;
    }
};

export default GetUsers;