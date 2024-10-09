import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import './style/SidebarAndNavbarPage.css';
import util from '../../util/util';
import AddProductModal from '../modal/AddProductModal';
import AddTransactionModal from '../modal/AddTransactionModal';
import DeleteModal from '../modal/DeleteModal';
import NotifyModal from '../modal/NotifyModal';
import BoxAddTransaction from '../boxs/BoxAddTransaction';

function SidebarAndNavbarPage({ ContentComponent, setDashboardVisible, setProductVisible, setTransactionVisible, setQuery, fetchData }) {
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
  const [selectedProductAddTransaction, setSelectedProductAddTransaction] = useState(new Set());

  const [isBtnLoading, setIsBtnLoading] = useState(false);

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

    setSelectedProductAddTransaction(new Set())
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
    fetchData('customer/getcustomer')
    setNamePage('All Transaction')
    setShowPropertyNavBar(true);
    setSelectedRows(new Set());
    setSelectedProductAddTransaction(new Set())
  }

  const handleAddProduct = async () => {
    setIsBtnLoading(true);
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
      // throw error;
    }
    setIsBtnLoading(false);
  }

  const handleAddTransaction = async () => {
    let customer_result = null;
    setIsBtnLoading(true)
    try {
      const img = imagePreview; // Assuming imagePreview is the image URL
      const response = await fetch(img); // Fetch the image
      const blob = await response.blob(); // Convert the response to a Blob

      // Convert Blob to Base64
      const base64String = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]); // Get Base64 string without the data URL prefix
        reader.onerror = reject;
        reader.readAsDataURL(blob); // Read the Blob as Data URL
      });

      const data = {
        customer_img: base64String // Sending the Base64 string instead of the Blob
      };

      customer_result = await util.fetchPost('customer/addcustomer', data);
    } catch (error) {
      console.error('Error in handleAddTransaction:', error);
    }

    const transaction_data = {
      customer_id: customer_result.detail['customer_id'],
      product_list: Array.from(selectedProductAddTransaction).map(item => {
        return {
          product_id: item.product_id,
          qty: item.quantity,
        }
      })
    }

    try {
      const result = await util.fetchPost('transaction/addtransaction', transaction_data)
      console.log(result)
      if (result.code === 201) {
        setShowNotify(true);
        setMessage('customer_id ' + customer_result.detail['customer_id'] + ' added success')
        setBtnType('success')
        handleAddClose()
        handleTransactionPage()
      }
      else {
        setShowNotify(true);
        setMessage('Failed to add transaction')
        setBtnType('warning')
      }
      setIsBtnLoading(false)
    }
    catch (error) {
      console.error('Error in handleAddTransaction:', error);
    }
  };

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
        col_name={namePage === 'All Product' ? 'product_id' : 'customer_id'}
        handlePage={namePage === 'All Product' ? handleProductPage : handleTransactionPage}
        path={namePage === 'All Product' ? 'product/deleteproduct' : 'customer/deletecustomer'}
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
            isBtnLoading={isBtnLoading}
          />
        )
      }
      {
        showAddModalTransaction && (
          <AddTransactionModal
            handleAddClose={handleAddClose}
            imagePreview={imagePreview}
            handleFileChange={handleFileChange}
            uploadButtonSize={uploadButtonSize}
            handleAddTransaction={handleAddTransaction}
            selectedProductAddTransaction={selectedProductAddTransaction}
            setSelectedProductAddTransaction={setSelectedProductAddTransaction}
            isBtnLoading={isBtnLoading}
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
