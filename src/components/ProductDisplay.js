import React, { useEffect, useState } from "react";
// import HOC from "./HocDataLoad";

const ProductList = () => {
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

    if (isLoading) return <p>Hold on, fetching data might take some time.</p>;
    else {
        return (
            <div className='product-base'>
                <div className='product-table'>
                    <table>
                        <thead>
                            <tr>
                                <th><button title="Sort-By" className="header-butn">Order ID</button></th>
                                <th><button title="Sort-By" className="header-butn">Name</button></th>
                                <th><button title="Sort-By" className="header-butn">Description</button></th>
                                <th><button title="Sort-By" className="header-butn">Price</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((product, index) => {
                                    return (
                                        <tr key={index} className={index % 2 === 0 ? 'background-white' : 'background-whitesmoke'}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>{product.price}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };
};

export default ProductList;