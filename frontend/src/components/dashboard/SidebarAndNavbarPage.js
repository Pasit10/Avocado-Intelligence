import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import './style/SidebarAndNavbarPage.css';
import Table from '../table/Table';

function SidebarAndNavbarPage({ ContentComponent, setDashboardVisible, setProductVisible, setTransactionVisible, setQuery, BoxAddTransaction, fetchData }) {
  // States for controlling the modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModalProduct, setshowAddModalProduct] = useState(false);
  const [showAddModalTransaction, setshowAddModalTransaction] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadButtonSize, setUploadButtonSize] = useState('btn-lg');

  const [namePage, setNamePage] = useState('Dashboard');

  // Functions to open/close modals
  const handleDeleteShow = () => {
    if (namePage !== "Dashboard") {
      setShowDeleteModal(true);
    }
  }
  const handleDeleteClose = () => setShowDeleteModal(false);
  const handleAddShow = () => {
    if (namePage === 'All Product') {
      setshowAddModalProduct(true);
    }
    else if (namePage === 'All Transaction') {
      setshowAddModalTransaction(true);
    }
  };
  const handleAddClose = () => {
    setshowAddModalProduct(false);
    setshowAddModalTransaction(false);
    setImagePreview(null); // Reset image preview on close
    setUploadButtonSize('btn-lg'); // Reset button size on close
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setUploadButtonSize('btn-sm'); // Change button size after upload
    }
  };

  const handleDashboardPage = () => {
    setDashboardVisible(true);
    setProductVisible(false);
    setTransactionVisible(false);
    // setQuery('')
    fetchData('');
    setNamePage('Dashboard')
  }
  const handleProductPage = () => {
    setDashboardVisible(false);
    setProductVisible(true);
    setTransactionVisible(false);
    // setQuery('products');
    fetchData('products')
    setNamePage('All Product')
  }
  const handleTransactionPage = () => {
    setDashboardVisible(false);
    setProductVisible(false);
    setTransactionVisible(true);
    // setQuery('transactions');
    fetchData('transactions')
    setNamePage('All Transaction')
  }

  return (
    <div className="grid-container">
      {/* Sidebar */}
      <div className="custom-containersidebar">
        <ul className="nav flex-column">
          <li className="nav-item" onClick={handleDashboardPage}><span className="icon">🏠</span><a className="nav-link active">Dashboard</a></li>
          <li className="nav-item" onClick={handleProductPage}><span className="icon">📦</span><a className="nav-link">Products</a></li>
          <li className="nav-item" onClick={handleTransactionPage}><span className="icon">💳</span><a className="nav-link">Transactions</a></li>
        </ul>
      </div>

      {/* Navbar */}
      <div className="custom-containernavbar">
        <div className="navbar-header"><h1 className="navbar-title">{namePage}</h1></div>
        <div style={{
          display: "flex",
          flexDirection: "row",
          marginRight: "15%",
        }}>
          <div className="navbar-container-buttons">
            <button className="btn btn-primary me-3" onClick={handleDeleteShow}>Delete</button>
            <button className="btn btn-primary" onClick={handleAddShow}>Add</button>
          </div>
          <div className="search-container">
            <input type="text" className="form-control" placeholder="Search..." />
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className='content-container'>
        <div className='container-fluid'>
          {ContentComponent}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
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
          <Button variant="danger" onClick={handleDeleteClose}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Item Modal */}
      {
        showAddModalProduct && (
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
                      <input type="text" id="productName" className="form-control mt-1" placeholder="Enter product name" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="price" className="form-label text-start">Price</label>
                      <input type="text" id="price" className="form-control mt-1" placeholder="Enter price" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="productDetails" className="form-label text-start">Product Details</label>
                      <input type="text" id="productDetails" className="form-control mt-1" placeholder="Enter product details" />
                    </div>
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
      {
        showAddModalTransaction && (
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
    </div >
  );
}

export default SidebarAndNavbarPage;
