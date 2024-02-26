import {Button, ListGroup} from "react-bootstrap";
import {useEffect, useState} from "react";
import editGroup from "../../api/group/EditGroup";
import successNotify from "../../../util/notification/success/SuccessNotify";
import notifyError from "../../../util/notification/error/ErrorNotify";
import deleteGroup from "../../api/group/DeleteGroup";
import GroupCourseModal from "../modalWindow/GroupCourseModal";
import {useNavigate} from "react-router-dom";
import DeleteModal from "../modalWindow/DeleteModal";

const CourseListItem = ({ courseItem, updateGroupCourse, deleteGroupCourse }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedName, setEditedName] = useState(courseItem.name);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();
    
    const handleEdit = () => {
        setShowEditModal(true);
    }
    
    const handleDelete = () => {
        setShowDeleteModal(true);
    }
    
    const handleClose = () => {
        setShowEditModal(false);
        setShowDeleteModal(false);
    }
    
    const handleSave = async e => {
        e.preventDefault();
        setShowEditModal(false);
        
        try {
            await editGroup(courseItem.id, editedName);
            successNotify('Группа успешно отредактирована');
            updateGroupCourse({ ...courseItem, name: editedName });
        } catch (error) {
            notifyError('Ошибка при редактировании группы')
        }
    }
    
    const handleClick = () => {
        navigate(`/groups/${courseItem.id}`)
    }
    
    const confirmDelete = async () => {
        setShowDeleteModal(false);
        try {
            await deleteGroup(courseItem.id);
            deleteGroupCourse(courseItem);
            successNotify('Группа успешно удалена');
        } catch (error) {
            notifyError('Ошибка при удалении группы')
        }
    }
    
    useEffect(() => {
    }, [courseItem]);
    
    return (
        <>
            <ListGroup.Item variant="light">
                <a href="" className="link-secondary" onClick={e => handleClick(courseItem.id)}>{courseItem.name}</a>
                <div style={{float: "right"}}>
                    <Button variant="btn btn-warning" className="ms-2" onClick={handleEdit}>Edit</Button>
                    <Button variant="btn btn-danger" className="ms-2" onClick={handleDelete}>Delete</Button>
                </div>
            </ListGroup.Item>
            <GroupCourseModal handleSave={handleSave} handleClose={handleClose} show={showEditModal} editedName={editedName} setEditedName={setEditedName} modalName="Редактирование группы" />
            <DeleteModal showDeleteModal={showDeleteModal} confirmDelete={confirmDelete} handleClose={handleClose} />
        </>
    );
}

export default CourseListItem;