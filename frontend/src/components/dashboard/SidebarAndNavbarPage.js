import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap'; /*npm install react-bootstrap*/
import './style/SidebarAndNavbarPage.css';

function SidebarAndNavbarPage() {
  // States for controlling the modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Functions to open/close modals
  const handleDeleteShow = () => setShowDeleteModal(true);
  const handleDeleteClose = () => setShowDeleteModal(false);
  const handleAddShow = () => setShowAddModal(true);
  const handleAddClose = () => setShowAddModal(false);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="custom-containersidebar">
        <ul className="nav flex-column">
          <li className="nav-item">
            <span className="icon">🏠</span>
            <a className="nav-link active" aria-current="page" href="#">Dashboard</a>
          </li>
          <li className="nav-item">
            <span className="icon">📦</span>
            <a className="nav-link" href="#">Products</a>
          </li>
          <li className="nav-item">
            <span className="icon">💳</span>
            <a className="nav-link" href="#">Transactions</a>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-grow-1">
        {/* Navbar */}
        <div className="custom-containernavbar">
          {/* Title and buttons in one container */}
          <div className="navbar-header">
            <h1 className="navbar-title">All Product</h1>
          </div>
            <div className="navbar-buttons">
              <button className="btn btn-primary" onClick={handleDeleteShow}>Delete</button>
              <button className="btn btn-primary" onClick={handleAddShow}>Add</button>
            </div>
          {/* Search bar aligned to the right */}
          <div className="search-container">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
            />
          </div>
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
      <Modal show={showAddModal} onHide={handleAddClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Enter details for the new product:
          <input type="text" className="form-control mt-3" placeholder="Product Name" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddClose}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SidebarAndNavbarPage;