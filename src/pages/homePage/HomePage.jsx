import {useEffect} from "react";

const HomePage = () => {
    const authenticated = !!localStorage.getItem('token');
    
    useEffect(() => {
    }, []);
    
    return (
        <>
        {!authenticated ? (
                <>
                    <div className="text-center">
                        <h1>Добро пожаловать в систему кампусных курсов</h1>
                        <p>Для того чтобы начать пользоваться сайтом, вам необходимо зарегистрироваться или войти</p>
                    </div>
                </>
            ) : (
                <div className="text-center">
                    <h1>Добро пожаловать в систему кампусных курсов</h1>
                </div>
            )
        }
        </>
    );
}

export default HomePage;