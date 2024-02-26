import {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import TeacherSelect from "../teacherSelect/TeacherSelect";
import notifyError from "../../../util/notification/error/ErrorNotify";
import {useNavigate} from "react-router-dom";
import createCourse from "../../api/course/CreateCourse";
import CreateCourseApi from "../../api/course/CreateCourse";

const CreateCourse = ({addCourses, id}) => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        startYear: '',
        maximumStudentsCount: '',
        semester: 'Осенний',
        requirements: '',
        annotations: '',
        mainTeacherId: ''
    });
    
    const changeMainTeacher = (teacherId) => {
        setForm({...form, mainTeacherId: teacherId});
    }
    
    const handleCreate = async () => {
        try {
            validateForm();
            const course = await CreateCourseApi(form, id);
            setShow(false);
            addCourses(course);
            clearForm();
        } catch (error) {
            notifyError('Ошибка при создании курса');
        }
    }
    
    const validateForm = () => {
        const yearRegex = new RegExp('^[0-9]{4}$');
        const digitRegex = new RegExp('^[0-9]+$');
        
        if (!digitRegex.test(form.maximumStudentsCount) || !Number.isInteger(Number(form.maximumStudentsCount))) {
            notifyError("Количество мест должно быть целым числом.");
            throw new Error();
        }
        
        if (!yearRegex.test(form.startYear) || !Number.isInteger(Number(form.startYear))) {
            notifyError("Год начала курса должен быть реальным.");
            throw new Error();
        }
    }
    
    const clearForm = () => {
        setForm({
            name: '',
            startYear: '',
            maximumStudentsCount: '',
            semester: 'Осенний',
            requirements: '',
            annotations: '',
            mainTeacherId: ''
        });
    }
    
    return (
        <div className="pb-3">
            <button className="btn btn-primary" onClick={() => setShow(true)}>
                Создать курс
            </button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Создание курса</Modal.Title>
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
                            <label htmlFor="exampleFormControlInput1" className="form-label">Требования</label>
                            <textarea className="form-control" id="exampleFormControlInput1" onChange={e => setForm({...form, requirements: e.target.value})}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Аннотации</label>
                            <textarea className="form-control" id="exampleFormControlInput1" onChange={e => setForm({...form, annotations: e.target.value})}/>
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Основной преподаватель курса</label>
                        </div>
                        <TeacherSelect changeMainTeacher={changeMainTeacher}/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setShow(false)}>Закрыть</button>
                    <button className="btn btn-primary" onClick={handleCreate}>Создать</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CreateCourse;