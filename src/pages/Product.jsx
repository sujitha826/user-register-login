import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import SortableTable from '../components/SortableTable';

function Product() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://hplussport.com/api/products/order/price/sorc/qty/100`)               // API pulling products list that might take some time 
            .then((json) => json.json())
            .then((data) => {
                setIsLoading(false);
                setProducts(data);
            })
    }, []);

    return (
        <div>
            <Navbar />
            {isLoading ? <p>Please hold on, fetching data might take some time.</p> : <SortableTable TableData={products} />}
        </div>
    );
}

export default Product;