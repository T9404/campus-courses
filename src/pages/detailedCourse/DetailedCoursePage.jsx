import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import GetCourseDetailedInfo from "../../shared/api/course/GetCourseDetailedInfo";
import notifyError from "../../util/notification/error/ErrorNotify";
import Loading from "../../shared/components/loading/Loading";
import ConvertSemester from "../../util/converter/ConvertSemester";
import {Tab, Tabs} from "react-bootstrap";
import ConvertStatus from "../../util/converter/ConvertStatus";
import styles from './style.module.css';

const DetailedCoursePage = () => {
    const {id} = useParams();
    const [courseInfo, setCourseInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchCourseInfo = async () => {
            try {
                const result = await GetCourseDetailedInfo(id);
                setCourseInfo(result);
                setLoading(false);
            } catch (error) {
                notifyError('Ошибка при загрузке информации о курсе')
                localStorage.clear()
                navigate('/login')
            }
        }
        
        fetchCourseInfo().then();
    }, []);
    
    return (
        <>
            {loading ? (
                <Loading/>
            ) : (
                <>
                    <h1>{courseInfo.name}</h1>
                    <div className="d-flex align-items-center justify-content-between">
                        <p className="fs-4 ">Основные данные курса</p>
                        <button className="btn btn-warning">Редактировать</button>
                    </div>
                    
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <p className="mb-0 fs-6 fw-bold">
                                    <bold>Статус курса</bold>
                                </p>
                                <button className="btn btn-warning btn-sm">Изменить</button>
                            </div>
                            <p className="mt-2">{ConvertStatus(courseInfo.status)}</p>
                        </div>
                    </div>
                    
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <p className="mb-0 fs-6 fw-bold">Учебный год</p>
                                    <p className="mt-2 fs-6">{courseInfo.startYear}-{courseInfo.startYear + 1}</p>
                                </div>
                                <div className="col">
                                    <p className="mb-0 fs-6 fw-bold">Семестр</p>
                                    <p className="mt-2 fs-6">{ConvertSemester(courseInfo.semester)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <p className="mb-0 fs-6 fw-bold">Всего мест</p>
                                    <p className="mt-2 fs-6">{courseInfo.maximumStudentsCount}</p>
                                </div>
                                <div className="col">
                                    <p className="mb-0 fs-6 fw-bold">Студентов зачислено</p>
                                    <p className="mt-2 fs-6">{courseInfo.studentsEnrolledCount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col">
                                    <p className="mb-0 fs-6 fw-bold">Заявок на рассмотрении</p>
                                    <p className="mt-2 fs-6">{courseInfo.studentsInQueueCount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3 mt-4">
                        <Tab eventKey="home" title="Требования к курсу">
                            <p>{courseInfo.requirements}</p>
                        </Tab>
                        <Tab eventKey="profile" title="Аннотация">
                            <p>{courseInfo.annotations}</p>
                        </Tab>
                        <Tab eventKey="contact" title={`Уведомления (${courseInfo.notifications.length})`}>
                            // TO-DO: Check if it's admin or teacher in the course
                            <button className="btn btn-primary rounded-0 mb-3">Создать уведомление</button>
                            {courseInfo.notifications.map((notification, index) => (
                                <div key={index}>
                                    {notification.isImportant ? (
                                        <p className={`${index !== courseInfo.notifications.length - 1 ? styles.importantNotification : null}`}>
                                            {notification.text}
                                        </p>
                                    ) : (
                                        <p className={`${index !== courseInfo.notifications.length - 1 ? styles.notification : null}`}>
                                            {notification.text}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </Tab>
                    </Tabs>
                </>
            )
            }
        </>
    );
}

export default DetailedCoursePage;