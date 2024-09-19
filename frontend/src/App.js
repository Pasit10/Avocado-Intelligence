import './App.css';
import { useEffect, useState } from 'react';

import Table from './components/table/Table';
import BoxProduct from './components/boxs/BoxProduct';

function App() {
  const [dashboardVisible, setDashBoardVisible] = useState(false);
  const [productsVisible, setProductVisible] = useState(true);
  const [transactionsVisible, setTransactionsVisible] = useState(false);

  const [query, setQuery] = useState('products');
  return (
    <div className="App">
      {dashboardVisible && (
        <div>
        </div>
      )}
      {productsVisible && (
        <div>
          <Table query={query} columns={["Name", "Price"]} Box={BoxProduct} />
        </div>
      )}
      {transactionsVisible && (
        <div>
          <Table query={query} columns={["Gender", "Age", "Ethnicity"]} Box={BoxProduct} />
        </div>
      )}
    </div>
  );
}

export default App;
