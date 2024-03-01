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
import EditCourseTeacher from "../../shared/api/course/EditCourseTeacher";
import editCourseStatus from "../../shared/api/course/EditCourseStatus";
import AddMeToCourse from "../../shared/api/course/AddMeToCourse";
import TakeStudentToCourse from "../../shared/api/course/TakeStudentToCourse";
import AddNotification from "../../shared/api/notification/AddNotification";
import EditMark from "../../shared/api/mark/EditMark";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const DetailedCoursePage = () => {
    const {id} = useParams();
    const [courseInfo, setCourseInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [showEditCourseModalTeacher, setShowEditCourseModalTeacher] = useState(false);
    const [editCourseTeacherForm, setEditCourseTeacherForm] = useState({
        requirements: '',
        annotations: ''
    });
    
    const [showEditCourseModalAdmin, setShowEditCourseModalAdmin] = useState(false);
    const [form, setForm] = useState({
        name: '',
        startYear: '',
        maximumStudentsCount: '',
        semester: 'Осенний',
        requirements: '',
        annotations: '',
        mainTeacherId: ''
    });
    
    const [showEditStatusCourseModal, setShowEditStatusCourseModal] = useState(false);
    const [showEditStatusCourseText, setShowEditStatusCourseText] = useState(false);
    
    const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
    const [teacherId, setTeacherId] = useState('');
    
    const [showAddNotificationModal, setShowAddNotificationModal] = useState(false);
    const [formNotification, setFormNotification] = useState({
        text: '',
        isImportant: false
    });
    
    const [showFinalResultModal, setShowFinalResultModal] = useState(false);
    const [formMark, setFormMark] = useState({
        markType: '',
        mark: ''
    });
    
    const [studentResult, setStudentResult] = useState([]);
    
    const [showMidtermResultModal, setShowMidtermResultModal] = useState(false);
    
    useEffect(() => {
        const fetchCourseInfo = async () => {
            try {
                const result = await GetCourseDetailedInfo(id);
                editCourseTeacherForm.requirements = result.requirements;
                editCourseTeacherForm.annotations = result.annotations;
                setCourseInfo(result);
                setLoading(false);
            } catch (error) {
                notifyError('Ошибка при загрузке информации о курсе')
            }
        }
        
        fetchCourseInfo().then();
        
    }, []);
    
    const editCourseTeacherApi = async () => {
        try {
            const result = await EditCourseTeacher(editCourseTeacherForm, id);
            setCourseInfo(result);
            setShowEditCourseModalTeacher(false);
            notifySuccess('Информация о курсе успешно обновлена')
        } catch (error) {
            notifyError('Ошибка при обновлении информации о курсе')
        }
    }
    
    const checkIfTeacher = (teacherMail) => {
        if (courseInfo === undefined || courseInfo.teachers === undefined) {
            return false;
        }
        return courseInfo.teachers.map(teacher => teacher.email).includes(teacherMail);
    }
    
    
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
    
    const handleCreate = async () => {
    
    }
    
    const changeMainTeacher = (teacherId) => {
    
    }
    
    const setShowEditCourseModal = (value) => {
        if (localStorage.getItem('admin') === 'true') {
            setShowEditCourseModalAdmin(value);
        } else {
            setShowEditCourseModalTeacher(value);
        }
    }
    
    const handleStatusChange = async () => {
        try {
            console.log(showEditStatusCourseText)
            const result = await editCourseStatus(id, showEditStatusCourseText);
            setCourseInfo(result);
            setShowEditStatusCourseModal(false);
            notifySuccess('Статус успешно изменен')
        } catch (error) {
            notifyError('Статус курса не может быть изменен')
        }
    }
    
    const checkIfInCourse = () => {
        let email = localStorage.getItem('email');
        let isTeacher = checkIfTeacher(email);
        let isStudent = (courseInfo.students !== undefined) ? courseInfo.students.map(student => student.email).includes(email) : false;
        let isAdmin = localStorage.getItem('admin') === 'true';
        return isTeacher || isStudent || isAdmin;
    }
    
    const addStudentToCourse = async () => {
        try {
            await AddMeToCourse(id);
            notifySuccess('Вы успешно записались на курс')
        } catch (error) {
            notifyError('Вы уже записались на данный курс или набор закрыт')
        }
    }
    
    const acceptStudent = async (student) => {
        try {
            const result = await TakeStudentToCourse(id, student.id, 'Accepted');
            setCourseInfo(result);
            notifySuccess('Заявка студента на курс успешно отклонена')
        } catch (error) {
            notifyError('Ошибка при отклонении студента на курс')
        }
    }
    
    const rejectStudent = async (student) => {
        try {
            const result = await TakeStudentToCourse(id, student.id, 'Declined');
            setCourseInfo(result);
            notifySuccess('Заявка студента на курс успешно отклонена')
        } catch (error) {
            notifyError('Ошибка при отклонении студента на курс')
        }
    }
    
    const addNotification = async () => {
        try {
            console.log(formNotification)
            const result = await AddNotification(id, formNotification);
            setCourseInfo(result);
            setShowAddNotificationModal(false);
            setFormNotification({ text: '', isImportant: false });
            notifySuccess('Уведомление успешно добавлено')
        } catch (error) {
            setShowAddNotificationModal(false);
            notifyError('Ошибка при добавлении уведомления')
        }
    }
    
    const updateEstimatedMark = async () => {
        try {
            const result = await EditMark(id, studentResult.id, formMark);
            setCourseInfo(result);
            setShowFinalResultModal(false);
            setShowMidtermResultModal(false);
            notifySuccess('Оценка успешно добавлена')
        } catch (error) {
            notifyError('Ошибка при добавлении оценки')
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
                        {(localStorage.getItem('admin') === 'true' || checkIfTeacher(localStorage.getItem('email'))) &&
                            <button className="btn btn-warning" onClick={() => setShowEditCourseModal(true)}>Редактировать</button>
                        }
                    </div>
                    
                    {localStorage.getItem('admin') === 'true' ? (
                        // TO-DO : add (write call to api)
                        <Modal show={showEditCourseModalAdmin} onHide={() => setShowEditCourseModalAdmin(false)}>
                        <Modal.Header closeButton>
                                <Modal.Title>Создание курса add (write call to api)</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Название курса</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" onChange={e => setForm({...form, name: e.target.value})}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Год начала курса</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" onChange={e => setForm({...form, startYear: e.target.value})}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Общее количество
                                            мест</label>
                                        <input type="text" className="form-control" id="exampleFormControlInput1" onChange={e => setForm({...form, maximumStudentsCount: e.target.value})}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Семестр</label>
                                        <form className="">
                                            <label>
                                                <input type='radio' className="me-1" name="favourite" value="Осенний" defaultChecked
                                                       onChange={e => setForm({...form, semester: e.target.value})}></input>
                                                Осенний
                                            </label>
                                            <label className="ps-3">
                                                <input type='radio' className="me-1" name="favourite" value="Весенний"
                                                       onChange={e => setForm({...form, semester: e.target.value})}></input>
                                                Весенний
                                            </label>
                                        </form>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1"
                                               className="form-label">Требования</label>
                                        <ReactQuill
                                            id="requirements"
                                            value={form.requirements}
                                            onChange={value => setForm({...form, requirements: value})}
                                            modules={{toolbar: true}}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1"
                                               className="form-label">Аннотации</label>
                                        <ReactQuill
                                            id="annotations"
                                            value={form.annotations}
                                            onChange={value => setForm({...form, annotations: value})}
                                            modules={{toolbar: true}}
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">Основной
                                            преподаватель курса</label>
                                    </div>
                                    <TeacherSelect changeMainTeacher={changeMainTeacher}/>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-secondary" onClick={() => setShowEditCourseModalAdmin(false)}>Закрыть</button>
                                <button className="btn btn-primary" onClick={handleCreate}>Создать</button>
                            </Modal.Footer>
                        </Modal>
                    ) : (checkIfTeacher(localStorage.getItem('email')) && (
                        <Modal show={showEditCourseModalTeacher} onHide={() => setShowEditCourseModalTeacher(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Редактирование курса</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="courseName" className="form-label">Требования</label>
                                        <input type="text" className="form-control" id="courseName" value={editCourseTeacherForm.requirements}
                                               onChange={e => setEditCourseTeacherForm({...editCourseTeacherForm, requirements: e.target.value})}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="courseDescription" className="form-label">Аннотация</label>
                                        <textarea className="form-control" id="courseDescription" rows="3" value={editCourseTeacherForm.annotations}
                                                  onChange={e => setEditCourseTeacherForm({...editCourseTeacherForm, annotations: e.target.value})}></textarea>
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-secondary" onClick={() => setShowEditCourseModalTeacher(false)}>Закрыть</button>
                                <button className="btn btn-primary" onClick={editCourseTeacherApi}>Сохранить</button>
                            </Modal.Footer>
                        </Modal>
                        )
                    )}
                    
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <p className="mb-0 fs-6 fw-bold">
                                    <bold>Статус курса</bold>
                                </p>
                                {(localStorage.getItem('admin') === 'true' || checkIfTeacher(localStorage.getItem('email'))) &&
                                    <button className="btn btn-warning btn-sm" onClick={() => setShowEditStatusCourseModal(true)}>Изменить</button>
                                }
                                {!checkIfInCourse() &&
                                    <button className="btn btn-success" onClick={addStudentToCourse}>Записаться</button>
                                }
                            </div>
                            <p className="mt-2">{ConvertStatus(courseInfo.status)}</p>
                        </div>
                    </div>
                    
                    <Modal show={showEditStatusCourseModal} onHide={() => setShowEditStatusCourseModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Изменение статуса курса</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <div className="d-flex">
                                        <div className="form-check me-3">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="courseStatus"
                                                value="OpenForAssigning"
                                                onChange={e => setShowEditStatusCourseText(e.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor="openForAssigning">
                                                Открыт для записи
                                            </label>
                                        </div>
                                        <div className="form-check me-3">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                id="started"
                                                name="courseStatus"
                                                value="Started"
                                                onChange={e => setShowEditStatusCourseText(e.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor="started">
                                                В процессе
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                id="finished"
                                                name="courseStatus"
                                                value="Finished"
                                                onChange={e => setShowEditStatusCourseText(e.target.value)}
                                            />
                                            <label className="form-check-label" htmlFor="finished">
                                                Завершен
                                            </label>
                                        </div>
                                    </div>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowEditStatusCourseModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleStatusChange}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    
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
                            <div dangerouslySetInnerHTML={{__html: courseInfo.requirements}}/>
                        </Tab>
                        <Tab eventKey="profile" title="Аннотация">
                        <div dangerouslySetInnerHTML={{__html: courseInfo.annotations}}/>
                        </Tab>
                        <Tab eventKey="contact" title={`Уведомления (${courseInfo.notifications && courseInfo.notifications.length ? courseInfo.notifications.length : 0})`}>
                            {localStorage.getItem('admin') === 'true' || checkIfTeacher(localStorage.getItem('email')) ? (
                                <button className="btn btn-primary rounded-0 mb-3 mt-3" onClick={() => setShowAddNotificationModal(true)}>Создать уведомление</button>
                            ) : null}
                            {courseInfo.notifications && courseInfo.notifications.length !== 0 && courseInfo.notifications.map((notification, index) => (
                                <div key={index}>
                                    {notification.isImportant ? (
                                        <p className={`${styles.importantNotification}`}>
                                            {notification.text}
                                        </p>
                                    ) : (
                                        <p className={`${styles.notification}`}>
                                            {notification.text}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </Tab>
                    </Tabs>
                    
                    <Modal show={showAddNotificationModal} onHide={() => setShowAddNotificationModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Создание уведомление</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formBasicEmail" className="mb-3">
                                    <Form.Label>Текст уведомления</Form.Label>
                                    <Form.Control type="text" onChange={e => setFormNotification({...formNotification, text: e.target.value})}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Check type="checkbox" label="Важное уведомление" onChange={e => setFormNotification({...formNotification, isImportant: e.target.checked})}/>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowAddNotificationModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={addNotification}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    
                    
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
                                {courseInfo.teachers && courseInfo.teachers.map((teacher, index) => (
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
                                {courseInfo.students && courseInfo.students.map((student, index) => (
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
                                                        <button className="btn btn-success me-2" onClick={() => acceptStudent(student)}>
                                                            Принять
                                                        </button>
                                                        <button className="btn btn-danger" onClick={() => rejectStudent(student)}>
                                                            Отклонить заявку
                                                        </button>
                                                    </div>
                                                ) : (
                                                    null
                                                )}
                                                
                                                {student.status === 'Accepted' &&
                                                (checkIfTeacher(localStorage.getItem('email')) || localStorage.getItem('admin') === 'true' ||
                                                    student.email === localStorage.getItem('email')) ? (
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <p className="mt-2 fs-6 d-flex align-items-start">Промежуточная
                                                                            аттестация:</p>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <p className="mt-2 fs-6 d-flex align-items-start"
                                                                           onClick={() => {
                                                                               setShowMidtermResultModal(true);
                                                                               setStudentResult(student);
                                                                           }}>
                                                                            {ConvertMark(student.midtermResult)}</p>
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
                                                                        <p className="mt-2 fs-6 d-flex align-items-start" onClick={() => {
                                                                            setShowFinalResultModal(true);
                                                                            setStudentResult(student);
                                                                        }}>
                                                                            {ConvertMark(student.finalResult)}
                                                                        </p>
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
                    
                    <Modal show={showFinalResultModal} onHide={() => setShowFinalResultModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Финальная аттестация</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Студент {studentResult.name}</Form.Label>
                                    <div className="d-flex">
                                        <div className="form-check me-3">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="Passed"
                                                value="Passed"
                                                onChange={e => setFormMark({...formMark, mark: e.target.value, markType: 'Final'})}
                                            />
                                            <label className="form-check-label" htmlFor="openForAssigning">
                                                Пройдено
                                            </label>
                                        </div>
                                        <div className="form-check me-3">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="Failed"
                                                value="Failed"
                                                onChange={e => setFormMark({...formMark, mark: e.target.value, markType: 'Final'})}
                                            />
                                            <label className="form-check-label" htmlFor="started">
                                                Зафейлено
                                            </label>
                                        </div>
                                    </div>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowFinalResultModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => updateEstimatedMark()}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    
                    <Modal show={showMidtermResultModal} onHide={() => setShowMidtermResultModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Промежуточная аттестация</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Студент {studentResult.name}</Form.Label>
                                    <div className="d-flex">
                                        <div className="form-check me-3">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="Passed"
                                                value="Passed"
                                                onChange={e => setFormMark({...formMark, mark: e.target.value, markType: 'Midterm'})}
                                            />
                                            <label className="form-check-label" htmlFor="openForAssigning">
                                                Пройдено
                                            </label>
                                        </div>
                                        <div className="form-check me-3">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="Failed"
                                                value="Failed"
                                                onChange={e => setFormMark({...formMark, mark: e.target.value, markType: 'Midterm'})}
                                            />
                                            <label className="form-check-label" htmlFor="started">
                                                Зафейлено
                                            </label>
                                        </div>
                                    </div>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowMidtermResultModal(false)}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => updateEstimatedMark()}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )
            }
        </>
    );
}

export default DetailedCoursePage;