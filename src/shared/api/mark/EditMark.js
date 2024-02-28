import axios from "axios";

const EditMark = async (courseId, studentId, formMark) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API}/courses/${courseId}/marks/${studentId}`, {
            markType: formMark.markType,
            mark: formMark.mark,
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

export default EditMark;
