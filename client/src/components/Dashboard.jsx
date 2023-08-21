import React from "react";
import SearchBar from "./SearchBar";
import ProductList from "./ProductList";

function Dashboard({ products, onSearch }) {
    return (
        <div className="dashboard">
            <SearchBar onSearch={onSearch} />
            <div className="product-grid">
                <ProductList title="All Products" products={products} />
            </div>
        </div>
    );
}

export default Dashboard;
