import axios from "axios";

const deleteGroup = async (id) => {
    try {
        const response = await axios.delete(`${process.env.REACT_APP_API}/groups/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });
        
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 401) {
            return Promise.reject(Error('Вы не авторизованы'));
        }
    }
    catch (error) {
        throw error;
    }
}

export default deleteGroup;
