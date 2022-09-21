import React from "react";
import HOC from "./HocDataLoad";

const ProductList = ({ isLoading, data }) => {
    if (!isLoading) return <p>Hold on, fetching data might take some time.</p>;
    else {
        return (
            <div className='product-base'>
                <div className='product-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((product, index) => {
                                    return (
                                        <tr key={index}>
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

const FetchProducts = HOC(ProductList);
export default FetchProducts;