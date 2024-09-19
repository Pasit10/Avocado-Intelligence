import { useEffect, useState } from "react";

import util from "../../util/util";
const BoxProduct = ({ id }) => {
    const query = `products/id?${id}`; 
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await util.fetchData(query);
            setData(result);
            console.log(result)
        };

        fetchData();
    }, [id])

    return (
        <div>
            {data}
        </div>
    )
}

export default BoxProduct;