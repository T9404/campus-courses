import {Button, Form, ListGroup, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import editGroup from "../../api/groupCourse/EditGroup";
import successNotify from "../../../util/notification/success/SuccessNotify";
import notifyError from "../../../util/notification/error/ErrorNotify";
import deleteGroup from "../../api/groupCourse/DeleteGroup";
import GroupCourseModal from "../modalWindow/groupCourseModal";

const CourseListItem = ({ courseItem, updateGroupCourse, deleteGroupCourse }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedName, setEditedName] = useState(courseItem.name);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    
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
            const response = await editGroup(courseItem.id, editedName);
            successNotify('Группа успешно отредактирована');
            updateGroupCourse({ ...courseItem, name: editedName });
        } catch (error) {
            notifyError('Ошибка при редактировании группы')
        }
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
                <a href="#" className="link-secondary">{courseItem.name}</a>
                <div style={{ float: "right" }}>
                    <Button variant="btn btn-warning" className="ms-2" onClick={handleEdit}>Edit</Button>
                    <Button variant="btn btn-danger" className="ms-2" onClick={handleDelete}>Delete</Button>
                </div>
            </ListGroup.Item>
            <GroupCourseModal handleSave={handleSave} handleClose={handleClose} show={showEditModal} editedName={editedName} setEditedName={setEditedName} modalName="Редактирование группы" />
            <Modal show={showDeleteModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Подтверждение удаления</Modal.Title>
                </Modal.Header>
                <Modal.Body>Вы уверены, что хотите удалить группу?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CourseListItem;