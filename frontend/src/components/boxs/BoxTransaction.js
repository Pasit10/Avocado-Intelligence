import { useEffect, useState } from "react";

import Loading from "../loading/Loading";
import Table from "../table/Table";
import BoxProduct from "./BoxProduct";

import util from "../../util/util";
const BoxTransactions = ({ id }) => {
    const queryData = `transaction/gettransaction/${id}`;

    const [transaction, setTransaction] = useState(null)
    const [dataList, setDataList] = useState([]);

    const [customerData, setcustomerData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await util.fetchData(queryData);
            // console.log(result);
            const customer = {
                customer_id: result.customer.customer_id,
                sex: result.customer.sex,
                age: result.customer.age,
                race: result.customer.race
            }
            setTransaction(result)
            setcustomerData(customer);
            setDataList(result.product_list);
            setIsLoading(false);
        };

        fetchData();

    }, [id]);

    return (
        <div className="container-fluid">
            {isLoading ? (
                <Loading />
            ) : dataList.length === 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    No data available
                </div>
            ) : (
                <div className="row">
                    <div className="col" style={{ minWidth: '500px' }}>
                        <h3 className="text-start">{transaction.transaction_date}</h3>
                        <Table name="Product" data={dataList} columns={['Product_id', 'name', 'qty']} Box={BoxProduct} />
                    </div>
                    <div className="col d-flex justify-content-center align-items-center ">
                        <div className="card" style={{ minWidth: "200px" }}>
                            <div className="card-header">
                                Customer
                            </div>
                            <div className="card-body">
                                <div className="text-start">
                                    <p className="card-text" style={{
                                        padding: "10px",
                                    }}>
                                        <strong>ID:</strong> {customerData.customer_id} <br />
                                        <strong>Sex:</strong> {customerData.sex} <br />
                                        <strong>Age:</strong> {customerData.age} <br />
                                        <strong>Race:</strong> {customerData.race}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            )}

        </div >
    )
}

export default BoxTransactions;