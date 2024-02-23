import axios from "axios";

const saveGroup = async (groupName) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/groups`, {
            name: groupName
        }, {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 401) {
            throw new Error('Вы не авторизованы');
        } else {
            throw new Error(`Unexpected status code: ${response.status}`);
        }
    } catch (error) {
        throw error;
    }
}

export default saveGroup;