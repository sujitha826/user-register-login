import React from 'react';
import Navbar from '../components/Navbar';
import FetchProducts from '../components/ProductDisplay';

function Product(props) {
    return (
        <div>
            <Navbar />
            <FetchProducts />
        </div>
    );
}

export default Product;