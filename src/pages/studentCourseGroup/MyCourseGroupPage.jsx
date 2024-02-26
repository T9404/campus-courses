import {useEffect, useState} from "react";
import getMyCourse from "../../shared/api/course/GetMyCourse";
import notifyError from "../../util/notification/error/ErrorNotify";
import CourseCard from "../../shared/components/courseCard/CourseCard";
import Loading from "../../shared/components/loading/Loading";

const MyCourseGroupPage = () => {
    const [loading, setLoading] = useState(true);
    const [myCourses, setMyCourses] = useState([]);
    
    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                const result = await getMyCourse();
                setMyCourses(result);
                setLoading(false)
            } catch (error) {
                notifyError('Ошибка при загрузке своих курсов')
            }
        }
        
        fetchMyCourses().then();
        
    }, []);
    
    
    return (
        <>
            {loading ? (
                <Loading/>
            ) : (
                <>
                    <h1>Мои курсы</h1>
                    <CourseCard subjectList={myCourses}/>
                </>
            )}
        </>
    )
}

export default MyCourseGroupPage;