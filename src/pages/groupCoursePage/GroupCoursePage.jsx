import {useEffect, useState} from "react";
import notifyError from "../../util/notification/error/ErrorNotify";
import getGroup from "../../shared/api/group/GetGroup";
import {Button, ListGroup} from "react-bootstrap";
import CourseListItem from "../../shared/components/courseListItem/CourseListItem";
import GroupCourseModal from "../../shared/components/modalWindow/GroupCourseModal";
import saveGroup from "../../shared/api/group/SaveGroup";
import notifySuccess from "../../util/notification/success/SuccessNotify";
import {useNavigate} from "react-router-dom";
import Loading from "../../shared/components/loading/Loading";

const GroupCoursePage = () => {
    const [loading, setLoading] = useState(true);
    const [groupCourses, setGroupCourses] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editedName, setEditedName] = useState('');
    
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchGroupCrourses = async () => {
            try {
                const result = await getGroup();
                console.log(result);
                setGroupCourses(result);
            } catch (error) {
                notifyError('Ошибка при загрузке групп курсов, авторизуйтесь заново')
                localStorage.clear();
                navigate('/login');
            } finally {
                setLoading(false);
            }
        }
        
        fetchGroupCrourses().then();
        
    }, []);
    
    const updateGroupCourse = (groupCourse) => {
        setGroupCourses(groupCourses.map(item => item.id === groupCourse.id ? groupCourse : item));
    }
    
    const deleteGroupCourse = (groupCourse) => {
        setGroupCourses(groupCourses.filter(item => item.id !== groupCourse.id));
    }
    
    const handleClose = () => {
        setShowCreateModal(false);
    }
    
    const handleSave = async () => {
        setShowCreateModal(false);
        console.log(groupCourses)
        try {
            const response = saveGroup(editedName);
            setEditedName('');
            response.then(data => setGroupCourses(prevCourses => [...prevCourses, { id: data.id, name: data.name }]));
            notifySuccess('Группа успешно создана');
        } catch (error) {
            notifyError('Ошибка при создании группы')
            localStorage.clear();
            navigate('/login');
        }
    }
    
    const handleClick = (id) => {
        navigate(`/groups/${id}`)
    }
    
    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                <h1 className="pb-3">Группы курсов</h1>
                {localStorage.getItem('admin') === "true" ? (
                    <>
                    <div className="pb-3">
                        <button className="btn btn-primary" onClick={e =>
                            setShowCreateModal(true)}>Создать группу</button>
                    </div>
                        <GroupCourseModal handleSave={handleSave} handleClose={handleClose} show={showCreateModal}
                                          editedName={editedName} setEditedName={setEditedName} modalName="Создание группы" />
                    <ListGroup>
                        {groupCourses.map((groupCourse) => (
                            <CourseListItem courseItem={groupCourse} updateGroupCourse={updateGroupCourse}
                                            deleteGroupCourse={deleteGroupCourse} />
                        ))}
                    </ListGroup>
                    </>
                ) : (
                    <ListGroup>
                        {groupCourses.map((groupCourse) => (
                            <ListGroup.Item action variant="light">
                                <a href="" className="link-secondary" onClick={e => handleClick(groupCourse.id)}>{groupCourse.name}</a>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
                    </>
                )}
        </>
    );
}

export default GroupCoursePage;