import {useState} from "react";

const RegistrationPage = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        fullName: '',
        birthDate: '',
        gender: 'Male',
        phoneNumber: ''
    });
    
    
    return (
        <div>
            <h1>Registration</h1>
        </div>
    )
}

export default RegistrationPage;