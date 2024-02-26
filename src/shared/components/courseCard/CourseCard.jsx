import ConvertStatus from "../../../util/converter/ConvertStatus";
import ConvertSemester from "../../../util/converter/ConvertSemester";
import {useNavigate} from "react-router-dom";

const CourseCard = ({ subjectList }) => {
    const navigate = useNavigate();
    
    const handleCourseClick = (id) => {
        navigate(`/courses/${id}`);
    }
    
    return (
        <div className="row">
            {subjectList.map((item) => (
                <div className="card  mb-3" onClick={() => handleCourseClick(item.id)} key={item.id}>
                    <h5 className="card-header">{item.name}</h5>
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <p className="card-text">Учебный год
                                    : {item.startYear}-{item.startYear + 1}</p>
                                <p className="card-text">Семестр: {ConvertSemester(item.semester)}</p>
                                <p className="card-text font-weight-normal opacity-50">Мест
                                    всего: {item.maximumStudentsCount}</p>
                                <p className="card-text font-weight-normal opacity-50">Осталось
                                    мест: {item.remainingSlotsCount}</p>
                            </div>
                            <div className="col-auto ml-auto">
                                <p className="card-text">{ConvertStatus(item.status)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CourseCard;