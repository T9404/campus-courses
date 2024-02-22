import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import notifyError from "../../util/notification/error/ErrorNotify";
import successNotify from "../../util/notification/success/SuccessNotify";
import notifyWarning from "../../util/notification/warning/WarningNotify";
import register from "../../shared/api/register/Registration";
import styles from './style.module.css';
import getUserRole from "../../shared/api/role/GetUserRole";

const RegistrationPage = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        birthDate: '',
        fullName: ''
    });
    
    const navigate = useNavigate();
    
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }, []);
    
    
    useEffect(() => {
        console.log(`${process.env.REACT_APP_API}`);
        console.log(localStorage.getItem('roles'))
    }, []);
    
    
    const handleSubmit = async e => {
        e.preventDefault();
        
        const validationErrors = validate(form);
        if (Object.keys(validationErrors).length > 0) {
            notifyWarning(Object.values(validationErrors).join(''));
            return;
        }
        
        try {
            const result = await register(form);
            if (!result.error) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('email', form.email);
                await navigate('/');
                await getUserRole();
                successNotify('Вы успешно вошли!')
            } else {
                notifyError(result.message)
            }
        } catch (error) {
            notifyError("Пользователь с таким email уже существует или слабый пароль")
        }
    };
    
    const validate = (values)=>{
        const errors = {};
        const emailRegex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/i;
        const passwordRegex = /^.*\d.*$/i;
        
        if (!emailRegex.test(values.email)) {
            errors.email = 'Неверный формат email\n';
        }
        
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'Пароли не совпадают\n';
        }
        
        if (values.password.length < 6) {
            errors.password = 'Пароль должен содержать не менее 6 символов\n';
        }
        
        if (!passwordRegex.test(values.password)) {
            errors.password = 'Пароль должен содержать хотя бы одну цифру\n';
        }
        
        if (new Date(values.birthDate) > new Date() || new Date(values.birthDate).getFullYear() < 1900) {
            errors.birthDate = 'Неверная дата рождения\n';
        }
        
        return errors;
    };
    
    
    return (
        <div className={`mx-auto my-auto ${styles.registerForm}`}>
            <form onSubmit={handleSubmit} className="shadow p-3 mb-5 bg-body rounded">
                <h3>Регистрация</h3>
                <label htmlFor="exampleFullName1" className="form-label">ФИО</label>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Иванов Иван Иванович"
                        name="fullName"
                        onChange={e => setForm({...form, fullName: e.currentTarget.value})}
                        required
                    />
                </div>
                
                <label htmlFor="exampleDateBirth1" className="form-label">
                    Дата рождения
                </label>
                <div className="mb-3">
                    <input
                        id="startDate"
                        className="form-control"
                        type="date"
                        onChange={e => setForm({...form, birthDate: e.currentTarget.value})}
                        max={new Date().toISOString().split('T')[0]}
                        required
                    />
                </div>
                
                <label htmlFor="email1" className="form-label">
                    Email
                </label>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        name="email"
                        onChange={(e) => setForm({...form, email: e.currentTarget.value})}
                        required
                    />
                </div>
                
                <label htmlFor="password1" className="form-label">
                    Password
                </label>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={(e) => setForm({...form, password: e.currentTarget.value})}
                        required
                    />
                </div>
                
                <label htmlFor="confirmPassword1" className="form-label">
                    Confirm Password
                </label>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        onChange={(e) => setForm({...form, confirmPassword: e.currentTarget.value})}
                        required
                    />
                </div>
                
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Зарегистрироваться
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationPage;