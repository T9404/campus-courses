import axios from "axios";

const AddNotification = async (courseId, formNotification) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/courses/${courseId}/notifications`, {
            text: formNotification.text,
            isImportant: formNotification.isImportant,
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        });
        
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 401) {
            return Promise.reject('Ошибка авторизации');
        }
    } catch (error) {
        throw error;
    }
}

export default AddNotification;
