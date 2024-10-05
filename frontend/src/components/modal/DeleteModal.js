import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import util from "../../util/util";

const DeleteModal = ({ showDeleteModal, handleDeleteClose, selectedItem, col_name, handlePage, path }) => {

    const handleConfirmDelete = async () => {
        const itemsToDelete = Array.from(selectedItem);

        try {
            for (const item of itemsToDelete) {
                const result = await util.fetchDelete(path, `${item[col_name]}`);
                if (result !== 200 && result !== 204) {
                    console.log(`Failed to delete item with ID: ${item[col_name]}`);
                }
            }
            handleDeleteClose();
            handlePage(); // Fetch the data again after successful deletion

        } catch (error) {
            console.error('Error during deletion:', error);
        }
    };


    return (
        <Modal show={showDeleteModal} onHide={handleDeleteClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete all selected items?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleDeleteClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirmDelete}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal