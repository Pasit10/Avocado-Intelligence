import { useEffect, useState } from "react";

import Loading from "../loading/Loading";
import Table from "../table/Table";
import BoxProduct from "./BoxProduct";

import util from "../../util/util";
const BoxTransactions = ({ id }) => {
    const queryData = `transactions/id?${id}`;
    const queryImg = `transactions/image/id?${id}`;

    const [data, setData] = useState([]);

    const [transactionData, setTransactionData] = useState(null);
    const [transactionImg, setTransactionImg] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await util.fetchData(queryData);
            console.log(result);
            if (result.length > 0) {
                const transaction = {
                    id: result[0].transaction_id,
                    gender: result[0].gender,
                    age: result[0].age,
                    ethnicity: result[0].ethnicity,
                }
                setTransactionData(transaction);
            }
            setData(result);
            setIsLoading(false);
        };

        const fetchImg = async () => {
            const result = await util.fetchImg(queryImg);
            setTransactionImg(result);
            console.log(result);
        };

        fetchData();
        fetchImg();

    }, [id]);

    return (
        <div className="container-fluid">
            {isLoading ? (
                <Loading />
            ) : data.length === 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    No data available
                </div>
            ) : (
                <div className="row">
                    <div className="col" style={{ minWidth: '500px' }}>
                        <h3 className="text-start">{data[0].date}</h3>
                        <Table name="Product" data={data} columns={['Name', 'Price', 'Quantity']} Box={BoxProduct} />
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="image text-center">
                                {transactionImg != null ? (
                                    <img src={transactionImg} alt="Customer image" className="card-img-bottom" />
                                ) : (
                                    <Loading />
                                )}
                            </div>
                            <div className="card-body">
                                <div className="text-start">
                                    <p className="card-text">
                                        <strong>ID:</strong> {transactionData.id} <br />
                                        <strong>Gender:</strong> {transactionData.gender} <br />
                                        <strong>Age:</strong> {transactionData.age} <br />
                                        <strong>Ethnicity:</strong> {transactionData.ethnicity}
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