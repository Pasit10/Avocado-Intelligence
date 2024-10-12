import { useState, useEffect } from "react";
import Table from "../table/Table";
import util from "../../util/util";
import BoxProduct from "./BoxProduct";

const BoxAddTransaction = ({ selectedRows, setSelectedRows, listProduct, setListProduct }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchState, setSearchState] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await util.fetchData('product/getproduct');
            const updatedData = result.map(item => ({
                ...item,
                quantity: 0,
            }));

            setData(updatedData);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        setListProduct(Array.from(selectedRows));
    }, [selectedRows]);

    const toggleSearch = () => {
        setSearchState(true);
    };

    const closeSearch = () => {
        setSearchState(false);
    };

    const tableStyle = {
        maxHeight: '400px',
        overflowY: 'auto',
        transition: 'all 0.3s ease',
    };

    return (
        <div className="h-100 d-inline-block">
            <div className="d-flex justify-content-between align-items-center">
                <button
                    type="button"
                    className={searchState ? "btn btn-secondary" : "btn btn-primary"}
                    style={{ width: '100%' }} // Set width to 100%
                    onClick={toggleSearch} // Toggle search mode when clicking on the button
                >
                    Selelct product
                </button>
                {searchState && (
                    <button type="button" className="btn-close m-3" onClick={closeSearch}></button>
                )}
            </div>
            <div style={tableStyle}>
                {searchState ? (
                    <Table
                        name={''}
                        data={data}
                        columns={['Product_id', 'Name']}
                        activateCheckBox={true}
                        isLoading={isLoading}
                        setData={setData}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        isShowList={false}
                        Box={BoxProduct}
                    />
                ) : (
                    <Table
                        name={''}
                        data={listProduct}
                        columns={['Product_id', 'Name']}
                        activateCheckBox={false}
                        isLoading={false}
                        activateQuantity={true}
                        setData={setListProduct}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        isShowList={true}
                        Box={BoxProduct}
                    />
                )}
            </div>
        </div>
    );
};

export default BoxAddTransaction;
