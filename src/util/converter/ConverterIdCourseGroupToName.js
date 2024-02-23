import axios from "axios";

const ConvertIdCourseGroupToName = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/groups`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });
        
        const array = response.data;
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                console.log(array[i].name);
                return array[i].name;
            }
        }
    } catch (error) {
        throw error;
    }
}

export default ConvertIdCourseGroupToName;