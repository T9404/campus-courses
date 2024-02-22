import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import getProfile from "../../shared/api/profile/GetProfile";
import notifyError from "../../util/notification/error/ErrorNotify";
import updateProfile from "../../shared/api/profile/UpdateProfile";
import styles from "./style.module.css";

const ProfilePage = () => {
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        email: '',
        fullName: '',
        birthDate: ''
    });
    
    const [error, setError] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProfile();
                const formattedBirthDate = new Date(data.birthDate);
                formattedBirthDate.setDate(formattedBirthDate.getDate() + 1);
                
                setForm((prevForm) => ({
                    ...prevForm,
                    email: data.email,
                    fullName: data.fullName,
                    birthDate: formattedBirthDate.toISOString().split('T')[0],
                }));
            } catch (error) {
                notifyError(error)
                localStorage.clear();
                navigate('/login');
            }
        };
        
        fetchData();
    }, [setError, navigate]);
    
    const handleSubmit = async e => {
        e.preventDefault();
        
        const validationErrors = validate(form);
        if (Object.keys(validationErrors).length > 0) {
            const errorMessage = `${validationErrors?.email || ''} ${validationErrors?.phoneNumber || ''} ${validationErrors?.birthDate || ''}`;
            if (errorMessage.trim() !== '') {
                notifyError(errorMessage);
                return;
            }
        }
        
        try {
            await updateProfile(form);
            window.location.reload();
        } catch (error) {
            notifyError(error)
        }
    }
    
    const validate = (values)=>{
        const errors = {};
        
        if (values.birthDate === '' || values.birthDate === null) {
            errors.birthDate = 'Необходимо указать дату рождения';
        }
        
        const birthDate = new Date(values.birthDate);
        const currentDate = new Date();
        if (birthDate > currentDate || birthDate.getFullYear() < 1900) {
            errors.birthDate = 'Неверная дата рождения';
        }
        
        return errors;
    };
    
    
    return (
        <div className={`mx-auto my-auto ${styles.profileForm}`}>
            <form onSubmit={handleSubmit} className="shadow p-3 mb-5 bg-body rounded">
                {error && (
                    <div className="error-message" style={{ color: 'red' }}>
                        {Object.values(error).map((errorMsg, index) => (
                            <p key={index}>{errorMsg}</p>
                        ))}
                    </div>
                )}
                <label htmlFor="email1" className="form-label">
                    Email
                </label>
                <div className="mb-3">
                    {form.email}
                </div>
                
                <label htmlFor="exampleFullName1" className="form-label">ФИО</label>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Иванов Иван Иванович"
                        name="fullName"
                        value={form.fullName}
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
                        value={form.birthDate}
                        onChange={e => setForm({...form, birthDate: e.currentTarget.value})}
                        required
                    />
                </div>
                
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-primary" type="button" onClick={handleSubmit}>Сохранить</button>
                </div>
            
            </form>
        </div>
    );
};

export default ProfilePage;