import { useState, useEffect } from "react";
import Table from "../table/Table";
import util from "../../util/util";

const BoxAddTransaction = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchState, setSearchState] = useState(false);
    const [listProduct, setListProduct] = useState([]);
    const [selectedRows, setSelectedRows] = useState(new Set());

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
        setListProduct(Array.from(selectedRows))
        console.log(selectedRows);
    }, [selectedRows]);

    const toggleSearch = () => {
        setSearchState(true);
    };

    const closeSearch = () => {
        setSearchState(false);
    };

    const tableStyle = {
        maxHeight: '400px',  // Set max height for the table container
        overflowY: 'auto',   // Enable vertical scrolling if content exceeds max height
        transition: 'all 0.3s ease',  // Smooth transition for height changes
    };

    return (
        <div className="h-100 d-inline-block">
            <div className="d-flex justify-content-between align-items-center">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    onClick={toggleSearch} // Toggle search mode when clicking on the search field
                />
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
                    />
                )}
            </div>
        </div>
    );
};

export default BoxAddTransaction;
