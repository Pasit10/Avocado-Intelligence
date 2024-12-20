import { useEffect, useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

import Loading from "../loading/Loading";
import util from "../../util/util";

const BoxProduct = ({ id }) => {
    const queryData = `transaction/getproducttransaction/${id}`;
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState("sex");
    const [xAxis, setXAxis] = useState([]);
    const [group, setGroup] = useState([]);
    const [series, setSeries] = useState([]);

    const [productData, setProductData] = useState(null);
    const [productImg, setProductImg] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await util.fetchData(queryData);
            // console.log(result);
            setData(result);
            setProductData(result["product"]);
            const base64String = result["product"]["product_img"];
            const byteCharacters = atob(base64String); // Decode base64
            const byteNumbers = new Array(byteCharacters.length);

            // Convert the decoded string to an array of bytes
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            const imgBlob = new Blob([byteArray], { type: "image/png" });  // Adjust MIME type if necessary
            const url = URL.createObjectURL(imgBlob);
            setProductImg(url);
            setIsLoading(false);
        };

        fetchData();

    }, [id]);

    useEffect(() => {
        if (data !== null) {

            // console.log(data["dates"]);
            const transaction_data = data["transaction_data"];
            const xAxis = []
            const group = []
            const series = []
            // console.log(transaction_data)
            const series_values = []

            // สร้างแกน X และ group จาก transaction_data
            transaction_data.forEach(transaction => {
                xAxis.push(transaction.transaction_date);
                const filterData = transaction[filteredData];
                if (filterData) {
                    const values = {}
                    // วนลูปเพื่อสร้าง group และค่าที่เกี่ยวข้อง
                    Object.entries(filterData).forEach(([label, value]) => {
                        if (!group.includes(label)) {
                            group.push(label);
                        }
                        values[label] = value
                    });
                    series_values.push(values)
                }
            });

            // สร้าง series จาก series_values
            series_values.forEach(sre => {
                const value = []
                group.forEach(grp => {
                    // ใช้ hasOwnProperty หรือเช็คด้วย !== undefined
                    if (!sre.hasOwnProperty(grp)) {
                        value.push(0);  // ถ้าไม่มีค่า ให้ใช้ 0
                    } else {
                        value.push(sre[grp]);  // ถ้ามีค่า ให้ใช้ค่าที่ได้
                    }
                });
                series.push(value);  // เพิ่มค่า value ลงใน series
            });

            // console.log(series_values);
            setXAxis(xAxis);
            setGroup(group);
            setSeries(series);

            // console.log(xAxis);
            // console.log(group);
            // console.log(series);
        }

    }, [data, filteredData]);

    const chartSetting = {
        yAxis: [
            {
                label: 'Quantity',
            },
        ],
        width: 500,
        height: 400,
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(-10px, 0)',
            },
        },
    };

    return (
        <div className="container-fluid">
            {isLoading ? (
                <Loading />
            ) : !data ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    No data available
                </div>
            ) : (
                <div className="row">
                    <div className="col">
                        <div className="btn-group mb-3" role="group" aria-label="Filter Options">
                            <button
                                type="button"
                                className={`btn btn-primary ${filteredData === 'sex' ? 'active' : ''}`}
                                onClick={() => setFilteredData('sex')}
                            >
                                Sex
                            </button>
                            <button
                                type="button"
                                className={`btn btn-primary ${filteredData === 'age' ? 'active' : ''}`}
                                onClick={() => setFilteredData('age')}
                            >
                                Age
                            </button>
                            <button
                                type="button"
                                className={`btn btn-primary ${filteredData === 'race' ? 'active' : ''}`}
                                onClick={() => setFilteredData('race')}
                            >
                                Race
                            </button>
                        </div>
                        <div>
                            <BarChart
                                xAxis={[{ scaleType: 'band', data: xAxis, label: 'Date' }]}
                                series={group.map((groupName, index) => ({
                                    data: series.map(dateSeries => dateSeries[index]),
                                    name: groupName,
                                    label: group[index]
                                }))}
                                slotProps={{ legend: { hidden: false } }}
                                {...chartSetting}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="image text-center">
                                {productImg != null ? (
                                    <img src={productImg} alt="Product image" className="card-img-bottom" />
                                ) : (
                                    <Loading />
                                )}
                            </div>
                            <div className="card-body" style={{
                                padding: "10px",
                            }}>
                                <div className="text-start">
                                    <p className="card-text" >
                                        <strong>ID:</strong> {productData.product_id} <br />
                                        <strong>Name:</strong> {productData.name} <br />
                                        <strong>Price:</strong> ${productData.price} <br />
                                        <strong>Total quantity:</strong> {productData.total_qty}
                                    </p>
                                    <p className="card-text"><strong>Detail:</strong> {productData.detail}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
};

export default BoxProduct;
