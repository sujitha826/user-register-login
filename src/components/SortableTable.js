import { useCallback, useState } from "react";

function sortData({ tableData, sortKey, reverse }) {
    if (!sortKey) return tableData;

    const sortedData = tableData.sort((a, b) => {
        return a[sortKey] > b[sortKey] ? 1 : -1;
    });

    if (reverse) {
        return sortedData.reverse();
    }
    return sortedData;
}


function SortButton({ sortOrder, columnKey, sortKey, onClick }) {
    return (
        <button
            onClick={onClick} title="Sort-By"
            className={`${sortKey === columnKey && sortOrder === "desc"
                ? "header-butn sort-reverse"
                : "header-butn"
                }`}
        >
            ▲
        </button>
    );
}

function SortableTable({ TableData }) {
    const [sortKey, setSortKey] = useState("id");
    const [sortOrder, setSortOrder] = useState("ascn");

    const headers = [
        { key: "id", label: "Order ID" },
        { key: "name", label: "Name" },
        { key: "description", label: "Description" },
        { key: "price", label: "Price" }
    ];

    const sortedData = useCallback(
        () => sortData({ tableData: TableData, sortKey: sortKey, reverse: sortOrder === "desc" }),
        [TableData, sortKey, sortOrder]
    );

    function changeSort(key) {
        setSortOrder(sortOrder === "ascn" ? "desc" : "ascn");
        setSortKey(key);
    }

    return (
        <div className='product-base'>
            <div className='product-table'>
                <table>
                    <thead>
                        <tr>
                            {headers.map((row) => {
                                return (
                                    <td key={row.key}>
                                        {row.label}
                                        <SortButton
                                            columnKey={row.key}
                                            onClick={() => changeSort(row.key)}
                                            {...{
                                                sortOrder,
                                                sortKey,
                                            }}
                                        />
                                    </td>
                                );
                            })}
                        </tr>
                    </thead>

                    <tbody>
                        {sortedData().map((product, index) => {

                            return (
                                <tr key={index} className={index % 2 === 0 ? 'background-white' : 'background-whitesmoke'}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SortableTable;