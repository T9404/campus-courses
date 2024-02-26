import {useParams} from "react-router-dom";
import ConvertIdCourseGroupToName from "../../util/converter/ConverterIdCourseGroupToName";
import {useEffect, useState} from "react";
import CreateCourse from "../../shared/components/course/CreateCourse";
import notifyError from "../../util/notification/error/ErrorNotify";
import getSubject from "../../shared/api/course/GetCourse";
import ConvertStatus from "../../util/converter/ConvertStatus";
import Loading from "../../shared/components/loading/Loading";
import CourseCard from "../../shared/components/courseCard/CourseCard";

const CourseListGroupPage = () => {
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
                ) : (subjectList && subjectList.length !== 0 ? (
                    <>
                        <h1 className="pb-3">Группа - {groupName}</h1>
                        {localStorage.getItem("admin") === "true" ? (<CreateCourse addCourses={addCourses} id={id}/>) : ""}
                        <CourseCard subjectList={subjectList}/>
                    </>
                ) : (
                    <>
                        <h1 className="pb-3">Группа - {groupName}</h1>
                        {localStorage.getItem("admin") === "true" ? (<CreateCourse addCourses={addCourses} id={id}/>) : ""}
                        <p>Простите, у нас пока нет ни одного курса.</p>
                        <p>Но не переживайте, мы работаем над этим!</p>
                        <p>Загляните позже или посмотрите, что у нас есть сейчас.</p>
                    </>
                ))}
            </>
      </>
    );
}

export default CourseListGroupPage;
