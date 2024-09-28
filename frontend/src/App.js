import './App.css';
import { useEffect, useState } from 'react';

import Table from './components/table/Table';
import BoxProduct from './components/boxs/BoxProduct';
import BoxTransactions from './components/boxs/BoxTransaction';
import BoxAddTransaction from './components/boxs/BoxAddTransaction';
import util from './util/util';
import SidebarAndNavbarPage from './components/dashboard/SidebarAndNavbarPage';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  const [dashboardVisible, setDashBoardVisible] = useState(true);
  const [productsVisible, setProductVisible] = useState(false);
  const [transactionsVisible, setTransactionsVisible] = useState(false);

  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (query) => {
    setIsLoading(true);
    const result = await util.fetchData(query);
    setData(result);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData(query);
  }, [query])

  return (
    <div className="App">
      <div>
        <SidebarAndNavbarPage ContentComponent={dashboardVisible ? (<Dashboard />) :
          productsVisible ? (
            <Table
              name={"Product"}
              data={data}
              columns={["Name", "Price"]}
              Box={BoxProduct}
              activateCheckBox={true}
              isLoading={isLoading} />
          ) : (
            <Table
              name={"Transaction"}
              data={data}
              columns={["Gender", "Age", "Ethnicity"]}
              Box={BoxTransactions}
              activateCheckBox={true}
              isLoading={isLoading} />
          )
        }
          setDashboardVisible={setDashBoardVisible}
          setProductVisible={setProductVisible}
          setTransactionVisible={setTransactionsVisible}
          setQuery={setQuery}
          BoxAddTransaction={<BoxAddTransaction />}
          fetchData={fetchData}
        />
      </div>
    </div>
  );
}

export default App;
