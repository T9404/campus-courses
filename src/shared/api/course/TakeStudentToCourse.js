import axios from "axios";

const TakeStudentToCourse = async (courseId, studentId, status) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/courses/${courseId}/student-status/${studentId}`, {
            status: status
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

export default TakeStudentToCourse;