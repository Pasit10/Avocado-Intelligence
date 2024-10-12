import React from 'react';

const TopSeller = ({ bestSellerProductData }) => {
  return (
    <div className="dashboard-col">
      <div className="card shadow">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Top seller</h6>
        </div>
        <div className="card-body">
          <div className="product-details">
            <h4>{bestSellerProductData.name}</h4>
            <p>Price: ${bestSellerProductData.price}</p>
          </div>
          <div className="image-container">
            <img 
              src={`data:image/jpeg;base64,${bestSellerProductData.product_img}`} 
              alt={bestSellerProductData.name} 
              style={{ width: '100%' }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSeller;
