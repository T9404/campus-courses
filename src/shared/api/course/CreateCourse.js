import axios from "axios";

const CreateCourseApi = async (form, id) => {
    try {
        console.log(form)
        console.log(id)
        const response = await axios.post(`${process.env.REACT_APP_API}/courses/${id}`, {
            name: form.name,
            startYear: parseInt(form.startYear, 10),
            maximumStudentsCount: parseInt(form.maximumStudentsCount, 10),
            semester: (form.semester === "Осенний" ? "Autumn" : "Spring"),
            requirements: form.requirements,
            annotations: form.annotations,
            mainTeacherId: form.mainTeacherId
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });
        
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 401) {
            return Promise.reject(Error('Вы не авторизованы'));
        }
    } catch (error) {
        throw error;
    }
}

export default CreateCourseApi;