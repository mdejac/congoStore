// components/ProductSellForm.jsx
import React from "react";

function ProductSellForm({ user }) {
    return (
        <div>
            <h1>Welcome, {user.first_name}! Sell Your Product</h1>
            <form>
                <textarea placeholder="Describe your product..."></textarea>
                <input type="number" placeholder="Price" />
                <input type="number" placeholder="Quantity" />
                <button type="submit">Sell it!</button>
            </form>
        </div>
    );
}

export default ProductSellForm;
