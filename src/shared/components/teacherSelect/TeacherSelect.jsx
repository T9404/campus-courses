import Select from "react-select";
import makeAnimated from "react-select/animated";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import getUsers from "../../api/user/GetUsers";
import notifyError from "../../../util/notification/error/ErrorNotify";

const TeacherSelect = ({changeMainTeacher}) => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUsers();
                setUsers(response);
            } catch (error) {
                notifyError('Вы не авторизованы, пожалуйста, войдите заново');
                navigate('/login');
                localStorage.clear();
            }
        };
        
        fetchData();
        
    }, [navigate]);
    
    useEffect(() => {
    }, [users]);
    
    const handleUserChange = (selectedOption) => {
        changeMainTeacher(selectedOption.value);
    };
    
    const options = users.map(user => ({
        value: user.id,
        label: user.fullName
    }));
    
    
    return (
        <Select
            closeMenuOnSelect={true}
            components={makeAnimated()}
            options={options}
            onChange={handleUserChange}
            placeholder="Выберите преподавателя"
            isClearable={true}
        />
    );
}

export default TeacherSelect;