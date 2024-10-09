import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import util from "../../util/util";
import Loading from "../loading/Loading";

const DeleteModal = ({ showDeleteModal, handleDeleteClose, selectedItem, col_name, handlePage, path }) => {

    const [isBtnLoading, setIsBtnLoading] = useState(false);
    const path_delete_transaction = `transaction/deletetransaction`
    const handleConfirmDelete = async () => {
        setIsBtnLoading(true);
        const itemsToDelete = Array.from(selectedItem);
        try {
            for (const item of itemsToDelete) {
                const param_delete_transaction = (col_name === "customer_id") ? `?customer_id=${item[col_name]}&product_id=all` : `?product_id=${item[col_name]}&customer_id=all`
                console.log(param_delete_transaction)
                const result = await util.fetchDelete(path_delete_transaction, param_delete_transaction);
                console.log(result)
                if (result !== 200 && result !== 204) {
                    console.log(`Failed to delete item with ID: ${item[col_name]}`);
                }
                const result_delete_product = await util.fetchDelete(path, `${item[col_name]}`)
                if (result_delete_product !== 200 && result_delete_product !== 204) {
                    console.log(`Failed to delete item with ID: ${item[col_name]}`);
                }
            }
            handleDeleteClose();
            handlePage(); // Fetch the data again after successful deletion
            
        } catch (error) {
            console.error('Error during deletion:', error);
        }
        setIsBtnLoading(false);
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
                <Button disabled={isBtnLoading} variant="danger" onClick={handleConfirmDelete}>
                {isBtnLoading ? (<Loading n={3} />) : (<div>Confirm</div>)}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal