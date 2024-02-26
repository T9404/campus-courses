import {useEffect, useState} from "react";
import GetMyTeachingCourse from "../../shared/api/course/GetMyTeachingCourse";
import notifyError from "../../util/notification/error/ErrorNotify";
import CourseCard from "../../shared/components/courseCard/CourseCard";
import Loading from "../../shared/components/loading/Loading";

const TeacherCourseGroupPage = () => {
    const [loading, setLoading] = useState(true);
    const [myTeachingCourses, setMyTeachingCourses] = useState([]);
    
    useEffect(() => {
        const fetchMyTeachingCourses = async () => {
            try {
                const result = await GetMyTeachingCourse();
                setMyTeachingCourses(result);
                setLoading(false)
            } catch (error) {
                notifyError('Ошибка при загрузке своих курсов')
            }
        }
        
        fetchMyTeachingCourses().then();
    }, []);
    
    
    return (
        <>
            {loading ? (
                <Loading/>
            ) : (
                <>
                    <h1>Преподаваемые курсы</h1>
                    <CourseCard subjectList={myTeachingCourses}/>
                </>
            )}
        </>
    );
}

export default TeacherCourseGroupPage;
