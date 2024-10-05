import React, { useState, useEffect } from 'react';

import Loading from '../loading/Loading';

const Table = ({
    name,
    data,
    columns,
    Box,
    activateCheckBox,
    isLoading,
    activateQuantity,
    setData,
    selectedRows,
    setSelectedRows,
    isShowList,
}) => {
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    // const [selectedRows, setSelectedRows] = useState(new Set());
    const [sortedData, setSortedData] = useState([]);

    const [boxVisible, setBoxVisible] = useState(false);
    const [selectedItemId, setselectedItemId] = useState("");

    const handleSort = (key) => {
        let direction = sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
        setSortConfig({ key, direction });
    };

    useEffect(() => {
        const sorted = [...data].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setSortedData(sorted);
    }, [sortConfig, data]);

    const handleCheckboxChange = (item) => {
        const newSelectedRows = new Set(selectedRows);
        if (newSelectedRows.has(item)) {
            newSelectedRows.delete(item);
            item.quantity = 0;
        } else {
            newSelectedRows.add(item);
            item.quantity = 1;
        }
        setSelectedRows(newSelectedRows);
    };

    const handleExtendObject = (id) => {
        setBoxVisible(true);
        setselectedItemId(id);
    };

    const handleCloseModal = () => {
        setBoxVisible(false);
        setselectedItemId(null);
    };

    const handleIncrementQuantity = (itemId) => {
        console.log(itemId)
        setData(prevData => {
            const updatedData = [...prevData]; // create a shallow copy of the array
            const item = updatedData.find(item => item[columns[0].toLowerCase()] === itemId); // find the item by id
            if (item) {
                console.log(item)
                item.quantity += 1; // directly update the quantity in the found item
            }
            return updatedData;
        });
    };

    const handleDecrementQuantity = (itemId) => {
        console.log(itemId)
        setData(prevData => {
            const updatedData = [...prevData]; // create a shallow copy of the array
            const item = updatedData.find(item => item[columns[0].toLowerCase()] === itemId); // find the item by id
            if (item && item.quantity > 0) {
                item.quantity -= 1; // directly update the quantity in the found item
                if (isShowList && item && selectedRows.has(item) && item.quantity === 0) {
                    selectedRows.delete(item);
                    return selectedRows;
                } else if (item && selectedRows.has(item) && item.quantity === 0) {
                    selectedRows.delete(item);
                }
            }
            return updatedData;
        });
    };

    const handleSelectAll = () => {
        if (selectedRows.size === data.length) {
            const allSelectedItems = new Set(data.map(item => {
                item.quantity = 0;
                return item;
            }));
            setSelectedRows(allSelectedItems);
            setSelectedRows(new Set());
        } else {
            const allSelectedItems = new Set(data.map(item => {
                item.quantity = 1;
                return item;
            }));
            setSelectedRows(allSelectedItems);
        }
    }

    const thStyle = {
        position: 'relative',
        whiteSpace: 'nowrap',
        cursor: 'pointer',
    };

    const sortSymbolStyle = {
        position: 'absolute',
        right: '0.5em',
        top: '50%',
        transform: 'translateY(-50%)',
    };

    const checkboxIdStyle = {
        position: 'relative',
        whiteSpace: 'nowrap',
        display: 'flex',
        justifyContent: 'flex-start',
    };

    const styleBox = {
        display: 'block',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        transition: 'transform 0.9s ease-out, opacity 0.6s ease-out',
    };

    return (
        <div className="container mt-4">
            <table className="table table-striped table-bordered" style={{ tableLayout: 'fixed' }}>
                <thead>
                    <tr>
                        <th style={checkboxIdStyle}>
                            {activateCheckBox && (
                                <input
                                    type="checkbox"
                                    onChange={() => {
                                        // if (activateQuantity) {
                                        //     handleSelectAll()
                                        // }
                                        // else {
                                        //     if (selectedRows.size === data.length) {
                                        //         setSelectedRows(new Set());
                                        //     } else {
                                        //         setSelectedRows(new Set(data.map(item => item)));
                                        //     }
                                        // }
                                        handleSelectAll()
                                    }}
                                    checked={selectedRows.size === data.length && data.length > 0}
                                />
                            )}
                            <div className="cursor-pointer" style={{ marginLeft: '30%', cursor: 'pointer' }} onClick={() => { handleSort(columns[0].toLowerCase()) }}>
                                {columns[0]}
                            </div>
                            {sortConfig.key === columns[0].toLowerCase() ? (sortConfig.direction === 'ascending' ? <span style={sortSymbolStyle}>▲</span> : <span style={sortSymbolStyle}>▼</span>) : ''}
                        </th>
                        {columns.map((item, index) => {
                            if (index === 0) {
                                return null;
                            }
                            return (
                                <th key={index} style={thStyle}>
                                    <div onClick={() => handleSort(item.toLowerCase())}>{item}</div>
                                    {sortConfig.key === item.toLowerCase() ? (
                                        sortConfig.direction === 'ascending' ? (
                                            <span style={sortSymbolStyle}>▲</span>
                                        ) : (
                                            <span style={sortSymbolStyle}>▼</span>
                                        )
                                    ) : ''}
                                </th>
                            );
                        })}

                        {activateQuantity && (
                            <th style={thStyle} >
                                <div onClick={() => { handleSort('quantity') }}>
                                    Quantity
                                </div>
                                {sortConfig.key === 'quantity' ? (sortConfig.direction === 'ascending' ? <span style={sortSymbolStyle}>▲</span> : <span style={sortSymbolStyle}>▼</span>) : ''}
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={columns.length + (activateQuantity ? 1 : 0)} style={{ textAlign: 'center', padding: '2em' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Loading />
                                </div>
                            </td>
                        </tr>
                    ) : sortedData.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + (activateQuantity ? 1 : 0)} style={{ textAlign: 'center', padding: '2em' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    No data available
                                </div>
                            </td>
                        </tr>
                    ) : (
                        sortedData.map((item, index) => (
                            <tr key={index}>
                                <td style={checkboxIdStyle}>
                                    {activateCheckBox && (
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.has(item)}
                                            onChange={() => {
                                                if (activateQuantity) {
                                                    handleCheckboxChange(item)
                                                }
                                                else {
                                                    const newSelectedRows = new Set(selectedRows);
                                                    if (newSelectedRows.has(item)) {
                                                        newSelectedRows.delete(item);
                                                    } else {
                                                        newSelectedRows.add(item);
                                                        item.quantity = 1;
                                                    }
                                                    setSelectedRows(newSelectedRows);
                                                }

                                            }}
                                        />
                                    )}
                                    <div className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" style={{ marginLeft: '30%', cursor: 'pointer' }} onClick={() => {
                                        handleExtendObject(item[columns[0].toLowerCase()]);
                                    }}>
                                        {item[columns[0].toLowerCase()]}
                                    </div>
                                </td>
                                {columns.map((col, index) => {
                                    if (index === 0) {
                                        return null;
                                    }
                                    return (
                                        <td key={index}>{item[col.toLowerCase()]}</td>
                                    )
                                })}
                                {activateQuantity && (
                                    <td key={index}>
                                        <button
                                            style={{ border: "none" }}
                                            onClick={() => handleDecrementQuantity(item[columns[0].toLowerCase()])}
                                            disabled={!selectedRows.has(item)} // Disable if not checked
                                        >
                                            -
                                        </button>
                                        {item.quantity}
                                        <button
                                            style={{ border: "none" }}
                                            onClick={() => handleIncrementQuantity(item[columns[0].toLowerCase()])}
                                            disabled={!selectedRows.has(item)} // Disable if not checked
                                        >
                                            +
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {boxVisible && (
                <div className="modal fade show" style={styleBox}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{name} Details</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <Box id={selectedItemId} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;
