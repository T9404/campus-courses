import {useEffect, useState} from "react";
import GetCourseDetailedInfo from "../../shared/api/course/GetCourseDetailedInfo";
import notifyError from "../../util/notification/error/ErrorNotify";
import Loading from "../../shared/components/loading/Loading";
import ConvertSemester from "../../util/converter/ConvertSemester";
import {Button, Form, Modal, Tab, Tabs} from "react-bootstrap";
import ConvertStatus from "../../util/converter/ConvertStatus";
import styles from './style.module.css';
import ConvertStudentStatus from "../../util/converter/ConvertStudentStatus";
import ConvertMark from "../../util/converter/ConvertMark";
import TeacherSelect from "../../shared/components/teacherSelect/TeacherSelect";
import notifySuccess from "../../util/notification/success/SuccessNotify";
import {useParams} from "react-router-dom";
import AddTeacherToCourse from "../../shared/api/teacher/AddTeacherToCourse";

const DetailedCoursePage = () => {
    const {id} = useParams();
    const [courseInfo, setCourseInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [showEditCourseModal, setShowEditCourseModal] = useState(false);
    
    const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
    const [teacherId, setTeacherId] = useState('');
    
    useEffect(() => {
        const fetchCourseInfo = async () => {
            try {
                const result = await GetCourseDetailedInfo(id);
                setCourseInfo(result);
                setLoading(false);
            } catch (error) {
                notifyError('Ошибка при загрузке информации о курсе')
            }
        }
        
        fetchCourseInfo().then();
    }, []);
    
    const checkIfTeacher = (teacherMail) => {
        return courseInfo.teachers.map(teacher => teacher.email).includes(teacherMail);
    }
    
    useEffect(() => {
        console.log(showAddTeacherModal)
    }, [showAddTeacherModal]);
    
    const addTeacherToCourse = (teacherId) => {
        setTeacherId(teacherId);
    }
    
    const addTeacherToCourseApi = async () => {
        try {
            const result = await AddTeacherToCourse(teacherId, id);
            courseInfo.teachers = result.teachers;
            setCourseInfo(courseInfo);
            setTeacherId('');
            setShowAddTeacherModal(false);
            notifySuccess('Преподаватель успешно добавлен на курс')
        } catch (error) {
            notifyError('Ошибка при добавлении преподавателя на курс')
        }
    }
    
    return (
        <>
            {loading ? (
                <Loading/>
            ) : (
                <>
                    <h1>{courseInfo.name}</h1>
                    <div className="d-flex align-items-center justify-content-between">
                        <p className="fs-4 ">Основные данные курса</p>
                        <button className="btn btn-warning" onClick={() => setShowEditCourseModal(true)}>Редактировать</button>
                    </div>
                    
                    
                    <Modal show={showEditCourseModal} onHide={() => setShowEditCourseModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Редактирование курса</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="courseName" className="form-label">Требования</label>
                                    <input type="text" className="form-control" id="courseName" value={courseInfo.requirements}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="courseDescription" className="form-label">Аннотация</label>
                                    <textarea className="form-control" id="courseDescription" rows="3" value={courseInfo.annotations}/>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-secondary" onClick={() => setShowEditCourseModal(false)}>Закрыть</button>
                            <button className="btn btn-primary">Сохранить</button>
                        </Modal.Footer>
                    </Modal>
                    
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
                    
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="nav nav-pills nav-fill mt-4">
                        <Tab eventKey="home" title="Требования к курсу">
                            <p>{courseInfo.requirements}</p>
                        </Tab>
                        <Tab eventKey="profile" title="Аннотация">
                            <p>{courseInfo.annotations}</p>
                        </Tab>
                        <Tab eventKey="contact" title={`Уведомления (${courseInfo.notifications.length})`}>
                            {localStorage.getItem('admin') === 'true' || checkIfTeacher(localStorage.getItem('email')) ? (
                                <button className="btn btn-primary rounded-0 mb-3 mt-3">Создать уведомление</button>
                            ) : null}
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
                    
                    {// add teacher to course modal}
                    }
                    <Modal show={showAddTeacherModal} onHide={() => setShowAddTeacherModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Добавление преподавателя на курс</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Выберите преподавателя</Form.Label>
                                    <TeacherSelect changeMainTeacher={addTeacherToCourse}/>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowAddTeacherModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => addTeacherToCourseApi()}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    
                    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="nav nav-pills nav-fill">
                        <Tab eventKey="home" title="Преподаватели">
                            {localStorage.getItem('admin') === 'true' ? (
                                <button className="btn btn-primary rounded-0 mb-3 mt-3" onClick={() => setShowAddTeacherModal(true)}>Добавить</button>
                            ) : null}
                            <div className="row">
                                {courseInfo.teachers.map((teacher, index) => (
                                    <div key={index} className="col-12 mb-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex align-items-center">
                                                    <p className="mb-0 fs-6 fw-bold">{teacher.name}</p>
                                                    {teacher.isMain ? (
                                                        <span className="badge btn btn-success me-2 ms-2">основной</span>
                                                    ) : null}
                                                </div>
                                                <p className="mt-2 fs-6">{teacher.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Tab>
                        <Tab eventKey="profile" title="Студенты">
                            <div className="row">
                                {courseInfo.students.map((student, index) => (
                                    <div key={index} className="col-12 mb-4 mt-3">
                                        <div className="card">
                                            <div className="card-body row">
                                                <div className="col-md-6">
                                                    <p className="mb-0 fs-6">Имя: {student.name}</p>
                                                    <p className="mt-2 fs-6">Статус: {ConvertStudentStatus(student.status)}</p>
                                                    <p className="mt-2 fs-6">{student.email}</p>
                                                </div>
                                                
                                                {student.status === 'InQueue' ? (
                                                    <div className="col-md-6 d-flex justify-content-end align-items-center">
                                                        <button className="btn btn-success me-2">
                                                            Принять
                                                        </button>
                                                        <button className="btn btn-danger">
                                                            Отклонить заявку
                                                        </button>
                                                    </div>
                                                ) : (
                                                    null
                                                )}
                                                
                                                {student.status === 'Accepted' ? (
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <p className="mt-2 fs-6 d-flex align-items-start">Промежуточная
                                                                            аттестация:</p>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <p className="mt-2 fs-6 d-flex align-items-start">{ConvertMark(student.midtermResult)}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12">
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <p className="mt-2 fs-6 d-flex align-items-start">Финальная
                                                                            аттестация:</p>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <p className="mt-2 fs-6 d-flex align-items-start">{ConvertMark(student.finalResult)}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    null
                                                )}
                                            
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Tab>
                    </Tabs>
                </>
            )
            }
        </>
    );
}

export default DetailedCoursePage;