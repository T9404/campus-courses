import axios from 'axios';


const logout = async () => {
    
    try {
        await axios.post(`${process.env.REACT_APP_API}/logout`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });
    } catch (error) {
        console.error('Error during logout:', error);
    }
    
    localStorage.clear();
    window.location.reload();
}

export default logout;