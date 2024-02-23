import {Button, Form, Modal} from "react-bootstrap";

const GroupCourseModal = ({ show, handleSave, handleClose, editedName, setEditedName, modalName }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{modalName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Название группы</Form.Label>
                        <Form.Control
                            value={editedName}
                            onChange={(e) => setEditedName(e.currentTarget.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSave}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default GroupCourseModal;