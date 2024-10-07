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
            const imgBlob = new Blob([result["product"]["product_img"]], { type: "image/jpeg" });  // or "image/png" based on your image type
            const url = URL.createObjectURL(imgBlob);
            setProductImg(url);
            setIsLoading(false);
        };

        fetchData();

    }, [id]);

    useEffect(() => {
        if (data !== null) {
            // console.log(data["dates"]);
            setXAxis(data["dates"]);
            setGroup(data["group"][filteredData]);
            setSeries(data["series"][filteredData]);

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
                            <div className="card-body">
                                <div className="text-start">
                                    <p className="card-text">
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
