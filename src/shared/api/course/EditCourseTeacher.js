import axios from "axios";

const EditCourseTeacher = async (editCourseTeacherForm, courseId) => {
    try {
        const response = await axios.put(`${process.env.REACT_APP_API}/courses/${courseId}`, {
            requirements: editCourseTeacherForm.requirements,
            annotations: editCourseTeacherForm.annotations,
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

export default EditCourseTeacher;
