import React from 'react';

const TopSeller = () => {
  return (
    <div className="dashboard-col">
      <div className="card shadow">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Top seller of the day</h6>
        </div>
        <div className="card-body">
          <div className="image-container">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6WWRz8YB6h7GkV7Wi-VDN8vgd3qwIstu5nQ&s" 
              alt="Top seller of the day" 
              style={{ width: '100%' }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSeller;
