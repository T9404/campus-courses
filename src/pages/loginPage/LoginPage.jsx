import {useNavigate} from "react-router-dom";
import styles from "./style.module.css";
import {useEffect, useState} from "react";
import login from "../../shared/api/login/Login";
import successNotify from "../../util/notification/success/SuccessNotify";
import notifyError from "../../util/notification/error/ErrorNotify";
import getUserRole from "../../shared/api/role/GetUserRole";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const result = await login(email, password);
            
            if (result.token) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('email', email);
                await getUserRole();
                successNotify('Вы успешно вошли!')
                await navigate('/');
            } else {
                notifyError(result.message)
            }
        } catch (error) {
            notifyError(error)
        }
    };
    
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        }
    }, []);
    
    return (
        <div className={`mx-auto my-auto ${styles.loginForm}`}>
            <form onSubmit={handleSubmit} className="shadow p-3 mb-5 bg-body rounded">
                <h3>Вход</h3>
                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
                        onChange={e => setEmail(e.currentTarget.value)}
                        autoComplete="email"
                        className="form-control"
                        placeholder="name@example.com"
                    />
                </div>
                <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
                <div className="mb-3">
                    <input
                        value={password}
                        onChange={e => setPassword(e.currentTarget.value)}
                        type="password"
                        name="password"
                        autoComplete="current-password"
                        className="form-control"
                    />
                </div>
                <div className={"d-flex flex-column"}>
                    <button onSubmit={handleSubmit} type="submit" className="btn btn-primary m-1">
                        Войти
                    </button>
                    <button onClick={() => navigate("/registration")} type="button" className="btn btn-secondary m-1">
                        Зарегистрироваться
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;