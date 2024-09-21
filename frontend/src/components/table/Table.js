import React, { useState, useEffect } from 'react';

import Loading from '../loading/Loading';

const Table = ({ name, data, columns, Box, activateCheckBox, isLoading}) => {
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [selectedRows, setSelectedRows] = useState(new Set());
    const [sortedData, setSortedData] = useState([]);

    const [boxVisible, setBoxVisible] = useState(false);
    const [selectedItemId, setselectedItemId] = useState("");

    useEffect(() => {
        console.log(selectedRows);
    }, [selectedRows]);

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
    }, [sortConfig, data])

    const handleCheckboxChange = (id) => {
        const newSelectedRows = new Set(selectedRows);
        if (newSelectedRows.has(id)) {
            newSelectedRows.delete(id);
        } else {
            newSelectedRows.add(id);
        }
        setSelectedRows(newSelectedRows);
    };

    const handleExtendObject = (id) => {
        console.log(id);
        setBoxVisible(true);
        setselectedItemId(id);
    }
    const handleCloseModal = () => {
        setBoxVisible(false); // Hide the modal
        setselectedItemId(null); // Clear the selected product ID
    };

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
    }

    const styleBox = {
        display: 'block',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        transition: "transform 0.9s ease-out, opacity 0.6s ease-out", /* Increase duration to 0.6s for a slower effect */
    }

    return (
        <div className="container mt-4">
            <table className="table table-striped table-bordered" style={{ tableLayout: 'fixed' }}>
                <thead>
                    <tr>
                        <th style={checkboxIdStyle}>
                            {activateCheckBox && (
                                <input type="checkbox" onChange={() => {
                                    if (selectedRows.size === data.length) {
                                        setSelectedRows(new Set());
                                    } else {
                                        setSelectedRows(new Set(data.map(item => item.id)));
                                    }
                                }} checked={selectedRows.size === data.length && data.length > 0} />
                            )}
                            <div className="cursor-pointer" style={{ marginLeft: '30%' , cursor: 'pointer'}} onClick={() => { handleSort('id') }}>ID</div>
                            {sortConfig.key === 'id' ? (sortConfig.direction === 'ascending' ? <span style={sortSymbolStyle}>▲</span> : <span style={sortSymbolStyle}>▼</span>) : ''}
                        </th>
                        {columns.map((item, index) => (
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
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={columns.length + 1} style={{ textAlign: 'center', padding: '2em' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Loading />
                                </div>
                            </td>
                        </tr>
                    ) : sortedData.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + 1} style={{ textAlign: 'center', padding: '2em' }}>
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
                                            checked={selectedRows.has(item.id)}
                                            onChange={() => handleCheckboxChange(item.id)}
                                        />
                                    )}
                                    <div className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" style={{ marginLeft: "30%", cursor: "pointer" }} onClick={() => {
                                        handleExtendObject(item.id)
                                    }}>{item.id}</div>
                                </td>
                                {columns.map((col, index) => (
                                    <td key={index}>{item[col.toLowerCase()]}</td>
                                ))}
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
        </div >
    );
};

export default Table;