import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import './style/SidebarAndNavbarPage.css';
import util from '../../util/util';
import AddProductModal from '../modal/AddProductModal';
import AddTransactionModal from '../modal/AddTransactionModal';
import DeleteModal from '../modal/DeleteModal';
import NotifyModal from '../modal/NotifyModal';

function SidebarAndNavbarPage({ ContentComponent, setDashboardVisible, setProductVisible, setTransactionVisible, setQuery, BoxAddTransaction, fetchData }) {
  // States for controlling the modals
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModalProduct, setshowAddModalProduct] = useState(false);
  const [showAddModalTransaction, setshowAddModalTransaction] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadButtonSize, setUploadButtonSize] = useState('btn-lg');
  const [showPropertyNavBar, setShowPropertyNavBar] = useState(false);

  const [namePage, setNamePage] = useState('Dashboard');

  const [addProductName, setAddProductName] = useState('');
  const [addProductPrice, setAddProductPrice] = useState('');
  const [addProductDetail, setAddProductDetail] = useState('');

  const [showNotify, setShowNotify] = useState(false);
  const [message, setMessage] = useState('');
  const [btnType, setBtnType] = useState('');

  const [selectedRows, setSelectedRows] = useState(new Set());

  // useEffect(() => {
  //   console.log(selectedRows)
  // }, [selectedRows])
  // Functions to open/close modals
  const handleDeleteShow = () => {
    if (namePage !== "Dashboard") {
      if (selectedRows.size === 0) {
        setShowNotify(true);
        setMessage("Please, Select item to delete.")
        setBtnType('warning')
      } else {
        setShowDeleteModal(true);
      }
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

    setAddProductName("")
    setAddProductPrice("")
    setAddProductDetail("")
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
    setShowPropertyNavBar(false);
  }
  const handleProductPage = () => {
    setDashboardVisible(false);
    setProductVisible(true);
    setTransactionVisible(false);
    // setQuery('products');
    fetchData('product/getproduct')
    setNamePage('All Product')
    setSelectedRows(new Set());
    setShowPropertyNavBar(true);
  }
  const handleTransactionPage = () => {
    setDashboardVisible(false);
    setProductVisible(false);
    setTransactionVisible(true);
    // setQuery('transactions');
    fetchData('transactions')
    setNamePage('All Transaction')
    setShowPropertyNavBar(true);
    setSelectedRows(new Set());
  }

  const handleAddProduct = async () => {
    const data = {
      name: addProductName,
      price: addProductPrice,
      detail: addProductDetail,
      product_img: "imagePreview"
    };

    try {
      const result = await util.fetchPost("product/addproduct", data);
      if (result && result.code === 201) {
        setMessage(result.message);
        handleAddClose()
        handleProductPage()
        setBtnType('success')
      } else {
        setMessage('Failed to add new product');
        setBtnType('warning')
      }
      setShowNotify(true);
    } catch (error) {
      console.error('Fetch Post Error:', error);
      throw error;
    }

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
        {showPropertyNavBar && (

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
        )}
      </div>

      {/* Content Container */}
      <div className='content-container'>
        <div className='container-fluid'>
          {React.cloneElement(ContentComponent, {
            selectedRows: selectedRows,
            setSelectedRows: setSelectedRows,
          })}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        showDeleteModal={showDeleteModal}
        handleDeleteClose={handleDeleteClose}
        selectedItem={selectedRows}
        col_name={namePage === 'All Product' ? 'product_id' : 'transaction_id'}
        handlePage={namePage === 'All Product' ? handleProductPage : handleTransactionPage}
        path={namePage === 'All Product' ? 'product/deleteproduct' : 'transaction/deletetransaction'}
      />

      {/* Add Item Modal */}
      {
        showAddModalProduct && (
          <AddProductModal
            handleAddClose={handleAddClose}
            imagePreview={imagePreview}
            handleFileChange={handleFileChange}
            setAddProductName={setAddProductName}
            setAddProductPrice={setAddProductPrice}
            setAddProductDetail={setAddProductDetail}
            addProductName={addProductName}
            addProductPrice={addProductPrice}
            addProductDetail={addProductDetail}
            handleAddProduct={handleAddProduct}
            uploadButtonSize={uploadButtonSize}
          />
        )
      }
      {
        showAddModalTransaction && (
          <AddTransactionModal
            handleAddClose={handleAddClose}
            imagePreview={imagePreview}
            handleFileChange={handleFileChange}
            BoxAddTransaction={BoxAddTransaction}
            uploadButtonSize={uploadButtonSize}
          />
        )
      }

      {
        <NotifyModal
          showModal={showNotify}
          setShowNotify={setShowNotify}
          message={message}
          btnType={btnType}
        />
      }
    </div >
  );
}

export default SidebarAndNavbarPage;
