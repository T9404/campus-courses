import axios from "axios";

const editGroup = async (id, name) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API}/groups/${id}`,
            { name: name },
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            }
        );
        
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

export default editGroup;