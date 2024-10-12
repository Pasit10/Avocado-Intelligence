import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const NotifyModal = ({ showModal, setShowNotify, message, btnType }) => {
    const handleClose = () => {
        setShowNotify(false)
    }
    return (
        <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Notify</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer hidden={btnType === 'secondary'}>
                <Button variant={btnType} onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NotifyModal