import axios from "axios";

const AddMeToCourse = async (courseId) => {
    console.log('courseId', courseId)
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/courses/${courseId}/sign-up`, {}, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        });
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 400) {
            return Promise.reject('Вы уже записаны на этот курс');
        } else if (response.status === 401) {
            return Promise.reject('Ошибка авторизации');
        }
    } catch (error) {
        throw error;
    }
}

export default AddMeToCourse;