import React from 'react';
import Navbar from '../components/Navbar';
import SortableTable from '../components/SortableTable';
import TableData from "../components/TableData.json";

function Product() {
    return (
        <div>
            <Navbar />
            <SortableTable TableData={TableData} />
        </div>
    );
}

export default Product;