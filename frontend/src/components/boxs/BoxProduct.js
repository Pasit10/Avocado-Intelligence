import { useEffect, useState } from "react";
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

import Loading from "../loading/Loading";

import util from "../../util/util";

const BoxProduct = ({ id }) => {
    const queryData = `products/id?${id}`;
    const queryImg = `products/image/id?${id}`;
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState("gender");
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
            console.log(result);
            if (result.length > 0) {
                const product = {
                    id: result[0].product_id,
                    name: result[0].product_name,
                    price: result[0].price,
                    detail: result[0].detail,
                };
                setProductData(product);
                console.log(product);

                const uniqueDates = [...new Set(result.map(item => item.date))];
                const lastFiveDates = uniqueDates.sort((a, b) => new Date(b) - new Date(a)).slice(0, 5);
                const dataset = result.filter(item => lastFiveDates.includes(item.date));
                setData(dataset);
                setIsLoading(false);
                return
            }
            setData(result);
            setIsLoading(false);
        };

        const fetchImg = async () => {
            const result = await util.fetchImg(queryImg);
            setProductImg(result);
            console.log(result);
        };
        fetchData();
        fetchImg();

    }, [id]);

    useEffect(() => {
        if (data.length === 0) return;

        const groupedData = data.reduce((acc, item) => {
            const date = item.date;
            const groupData = item[filteredData];

            if (!acc[date]) {
                acc[date] = {};
            }
            acc[date][groupData] = (acc[date][groupData] || 0) + 1;

            return acc;
        }, {});
        const dates = Object.keys(groupedData);
        const groups = Array.from(new Set(data.map(item => item[filteredData])));

        setXAxis(dates);
        setGroup(groups);

        const seriesData = groups.map(group =>
            dates.map(date => groupedData[date][group] || 0)
        );
        setSeries(seriesData);

        console.log(xAxis);
        console.log(group);
        console.log(series);

    }, [data, filteredData]);

    const chartSetting = {
        yAxis: [
            {
                label: 'quantity',
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
            ) : data.length === 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    No data available
                </div>
            ) : (
                <div className="row">
                    <div className="col">
                        <div className="btn-group mb-3" role="group" aria-label="Filter Options">
                            <button
                                type="button"
                                className={`btn btn-primary ${filteredData === 'gender' ? 'active' : ''}`}
                                onClick={() => setFilteredData('gender')}
                            >
                                Gender
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
                                className={`btn btn-primary ${filteredData === 'ethnicity' ? 'active' : ''}`}
                                onClick={() => setFilteredData('ethnicity')}
                            >
                                Ethnicity
                            </button>
                        </div>
                        <div>
                            <BarChart
                                xAxis={[{ scaleType: 'band', data: xAxis, label: 'date' }]}
                                series={group.map((groupName, index) => ({
                                    data: series[index],
                                    name: groupName,
                                    label: group[index]
                                }))}
                                slotProps={{ legend: { hidden: true } }}
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
                                        <strong>ID:</strong> {productData.id} <br />
                                        <strong>Name:</strong> {productData.name} <br />
                                        <strong>Price:</strong> ${productData.price}
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