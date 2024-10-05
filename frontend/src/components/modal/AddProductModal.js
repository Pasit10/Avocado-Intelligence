import { useState } from "react";
import { Button } from 'react-bootstrap';

const AddProductModal = ({ handleAddClose, imagePreview, handleFileChange, setAddProductName, setAddProductPrice, setAddProductDetail, handleAddProduct, uploadButtonSize, addProductName, addProductPrice, addProductDetail }) => {
    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Product</h5>
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
                            <div className="mb-3">
                                <label htmlFor="productName" className="form-label text-start">Product Name</label>
                                <input
                                    type="text"
                                    id="productName"
                                    className="form-control mt-1"
                                    placeholder="Enter product name"
                                    value={addProductName} // Use the state variable, not the setter
                                    onChange={(e) => setAddProductName(e.target.value)} // Update the state on typing
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label text-start">Price</label>
                                <input
                                    type="text"
                                    id="price"
                                    className="form-control mt-1"
                                    placeholder="Enter price"
                                    value={addProductPrice}
                                    onChange={(e) => setAddProductPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="productDetails" className="form-label text-start">Product Details</label>
                                <input
                                    type="text"
                                    id="productDetails"
                                    className="form-control mt-1"
                                    placeholder="Enter product details"
                                    value={addProductDetail}
                                    onChange={(e) => setAddProductDetail(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Button variant="secondary" onClick={handleAddClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleAddProduct}>
                            Add
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProductModal;