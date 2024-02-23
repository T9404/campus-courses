import {useState} from "react";
import {Modal} from "react-bootstrap";
import TeacherSelect from "../teacherSelect/TeacherSelect";

const CreateCourse = () => {
    const [show, setShow] = useState(false);
    
    return (
        <>
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
                            <input type="text" className="form-control" id="exampleFormControlInput1"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Год начала курса</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Общее количество
                                мест</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Семестр</label>
                            <form className="">
                                <label>
                                    <input type='radio' className="me-1" name="favourite_food" value="Осенний"
                                           defaultChecked></input>
                                    Осенний
                                </label>
                                <label className="ps-3">
                                    <input type='radio' className="me-1" name="favourite_food" value="Весенний"></input>
                                    Весенний
                                </label>
                            </form>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Требования</label>
                            <textarea className="form-control" id="exampleFormControlInput1"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Аннотации</label>
                            <textarea className="form-control" id="exampleFormControlInput1"/>
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Основной преподаватель курса</label>
                        </div>
                        <TeacherSelect/>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setShow(false)}>Закрыть</button>
                    <button className="btn btn-primary">Создать</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateCourse;