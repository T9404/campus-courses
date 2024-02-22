import {useEffect} from "react";

const HomePage = () => {
    const authenticated = !!localStorage.getItem('token');
    
    useEffect(() => {
    }, []);
    
    return (
        <>
        {!authenticated ? (
                <>
                    <div>
                        <h1>Добро пожаловать на сайт кампусных курсов</h1>
                        <p>Для того чтобы начать пользоваться сайтом, вам необходимо зарегистрироваться или войти</p>
                    </div>
                </>
            ) : (
                <div>
                    <h1>Добро пожаловать на сайт кампусных курсов</h1>
                </div>
            )
        }
        </>
    );
}

export default HomePage;