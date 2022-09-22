import React, { useEffect, useState } from "react";

const HOC = (WrappedComponent) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://hplussport.com/api/products/order/price/sorc/qty/100`)               // API pulling products list that might take some time 
            .then((json) => json.json())
            .then((products) => {
                console.log(products);
                setIsLoading(false);
                setProducts(products);
            })
    }, []);

    return (
        <div>
            <h2>Products List</h2>
            <WrappedComponent isLoading={isLoading} data={products}></WrappedComponent>
        </div>
    );
}

export default HOC;