import './App.css';
import { useEffect, useState } from 'react';

import Table from './components/table/Table';
import BoxProduct from './components/boxs/BoxProduct';
import BoxTransactions from './components/boxs/BoxTransaction';
import util from './util/util';
import SidebarAndNavbarPage from './components/dashboard/SidebarAndNavbarPage';

function App() {
  const [dashboardVisible, setDashBoardVisible] = useState(true);
  const [productsVisible, setProductVisible] = useState(false);
  const [transactionsVisible, setTransactionsVisible] = useState(false);

  const [query, setQuery] = useState('transactions');
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await util.fetchData(query);
      setData(result);
      setIsLoading(false);
    }

    fetchData();
  }, [query])

  return (
    <div className="App">
      {dashboardVisible && (
        <div>
          <SidebarAndNavbarPage/>
        </div>
      )}
      {productsVisible && (
        <div>
          <Table name={"Product"} data={data} columns={["Name", "Price"]} Box={BoxProduct} activateCheckBox={true} isLoading={isLoading} />
        </div>
      )}
      {transactionsVisible && (
        <div>
          <Table name={"Transaction"} data={data} columns={["Gender", "Age", "Ethnicity"]} Box={BoxTransactions} activateCheckBox={true} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
}

export default App;
