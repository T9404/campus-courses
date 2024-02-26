import {useParams} from "react-router-dom";
import ConvertIdCourseGroupToName from "../../util/converter/ConverterIdCourseGroupToName";
import {useEffect, useState} from "react";
import CreateCourse from "../../shared/components/course/CreateCourse";
import notifyError from "../../util/notification/error/ErrorNotify";
import getSubject from "../../shared/api/course/GetCourse";
import ConvertStatus from "../../util/converter/ConvertStatus";
import Loading from "../../shared/components/loading/Loading";

const CourseListGroup = () => {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [subjectList, setSubjectList] = useState([]);
    const [groupName, setGroupName] = useState(null);
    
    useEffect(() => {
        const convertIdToName = async () => {
            try {
                const name = await ConvertIdCourseGroupToName(id);
                setGroupName(name);
            } catch (error) {
                notifyError('Указанный курс не найден')
            }
        };
        
        const fetchSubjectList = async () => {
            try {
                const result = await getSubject(id);
                setSubjectList(result);
            } catch (error) {
                notifyError('Ошибка при загрузке курсов')
            } finally {
                setIsLoading(false);
            }
        }
        
        convertIdToName().then();
        fetchSubjectList().then();
    }, [id]);
    
    const addCourses = (course) => {
        setSubjectList(course)
    }
    
    return (
        <>
            <>
                {isLoading ? (
                    <Loading/>
                ) : (subjectList && subjectList.length != 0 ? (
                    <>
                        <h1 className="pb-3">Группа - {groupName}</h1>
                        {localStorage.getItem("admin") == "true" ? (<CreateCourse addCourses={addCourses} id={id}/>) : ""}
                        <div className="row">
                            {subjectList.map((item) => (
                                <div className="card  mb-3">
                                    <h5 className="card-header">{item.name}</h5>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <p className="card-text">Учебный год
                                                    : {item.startYear}-{item.startYear + 1}</p>
                                                <p className="card-text">Семестр: {item.semester}</p>
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
                    </>
                ) : (
                    <>
                        <h1 className="pb-3">Группа - {groupName}</h1>
                        {localStorage.getItem("admin") == "true" ? (<CreateCourse addCourses={addCourses} id={id}/>) : ""}
                        <p>Простите, у нас пока нет ни одного курса.</p>
                        <p>Но не переживайте, мы работаем над этим!</p>
                        <p>Загляните позже или посмотрите, что у нас есть сейчас.</p>
                    </>
                ))}
            </>
        </>
    );
}

export default CourseListGroup;
