import {useParams} from "react-router-dom";
import ConvertIdCourseGroupToName from "../../util/converter/ConverterIdCourseGroupToName";
import {useEffect, useState} from "react";
import CreateCourse from "../../shared/components/course/CreateCourse";

const CourseListGroup = () => {
    const {id} = useParams();
    
    const [groupName, setGroupName] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const name = await ConvertIdCourseGroupToName(id);
                setGroupName(name);
            } catch (error) {
                console.error('Ошибка при получении названия группы:', error.message);
            }
        };
        fetchData().then();
    }, [id]);
    
    
    return (
        <>
            <h1 className="pb-3">Группа - {groupName}</h1>
            {localStorage.getItem("admin") == "true" ? (
                <CreateCourse/>
            ) : ""}
            <div> TODO: Get all CourseList </div>
        </>
    );
}

export default CourseListGroup;
