import { useState } from "react";
import { Button } from 'react-bootstrap';

const AddTransactionModal = ({ handleAddClose, imagePreview, handleFileChange, BoxAddTransaction, uploadButtonSize}) => {
    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Transaction</h5>
                        <button type="button" className="btn-close" onClick={handleAddClose}></button>
                    </div>
                    <div className="modal-body d-flex">
                        <div className="me-3" style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="img-thumbnail mt-2"
                                    style={{ maxWidth: '100%', height: 'auto' }} // Ensure image does not exceed the container width
                                />
                            )}
                            <label className={`custom-file-upload btn ${uploadButtonSize}`} style={{ marginTop: '1rem' }}>
                                <input
                                    type="file"
                                    id="formFile"
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }} // Hide the default input
                                />
                                Upload Image
                            </label>
                        </div>
                        <div style={{ flex: '2' }}>
                            {BoxAddTransaction}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button variant="secondary" onClick={handleAddClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleAddClose}>
                            Add
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTransactionModal;