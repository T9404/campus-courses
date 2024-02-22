import axios from "axios";

const getUserRole = async () => {
    
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/roles`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            },
        });
        if (response.status === 200) {
            localStorage.setItem('admin', response.data.isAdmin);
            localStorage.setItem('student', response.data.isStudent);
            localStorage.setItem('teacher', response.data.isTeacher);
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};

export default getUserRole;