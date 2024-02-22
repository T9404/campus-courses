import {useEffect, useState} from "react";
import notifyError from "../../util/notification/error/ErrorNotify";
import getGroupCourses from "../../shared/api/groupCourse/GetGroupCourses";
import {Button, ListGroup} from "react-bootstrap";
import getUserRole from "../../shared/api/role/GetUserRole";

const GroupCoursePage = () => {
    const [loading, setLoading] = useState(true);
    const [groupCourses, setGroupCourses] = useState
    
    
    useEffect(() => {
        const fetchGroupCrourses = async () => {
            try {
                const result = await getGroupCourses();
                console.log(result);
                setGroupCourses(result);
            } catch (error) {
                notifyError('Ошибка при загрузке групп курсов')
            } finally {
                setLoading(false);
            }
        }
        
        fetchGroupCrourses().then();
        
    }, []);
    
    return (
        <>
            <h1 className="pb-3">Группы курсов</h1>
            {localStorage.getItem('admin') === "true" ? (
                <>
                <div className="pb-3">
                    <button className="btn btn-primary ">Создать</button>
                </div>
                <ListGroup>
                    {groupCourses.map((groupCourse) => (
                        <ListGroup.Item variant="light">
                            <a href="#" className="link-secondary">{groupCourse.name}</a>
                            <div style={{float: "right"}}>
                                <Button variant="btn btn-warning" className="ms-2">Редактировать</Button>
                                <Button variant="btn btn-danger" className="ms-2">Удалить</Button>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                </>
            ) : (
                <ListGroup>
                    {groupCourses.map((groupCourse, index) => (
                        <ListGroup.Item action variant="light">{groupCourse.name}</ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </>
    );
}

export default GroupCoursePage;