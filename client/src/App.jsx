import React, { useState, useEffect } from "react";
import LoginForm from './components/LoginForm';
import UserInfo from "./components/UserInfo";
import ProductDetail from "./components/ProductDetail";
import ProductList from "./components/ProductList";
import Dashboard from "./components/Dashboard";
import {
    fetchAllProducts,
    fetchProductsByCategory,
    fetchProductsByDescription,
    fetchProductById,
    fetchUserById,
    loginUser
} from './services/apiService';

function App() {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productOne, setProductOne] = useState({});
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await fetchAllProducts();
                setAllProducts(products.data);
                setFilteredProducts(products.data);

                const singleProduct = await fetchProductById(4);
                setProductOne(singleProduct.data);

                const singleUser = await fetchUserById(1);
                setUser(singleUser.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleLogin = async (email, password) => {
        try {
            const response = await loginUser({ email, password });
            if (response.data.errors) {
                setErrors(response.data.errors);
            } else {
                setErrors({});
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSearch = (searchTerm) => {
        const results = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
    };

    return (
        <>
            <LoginForm onLogin={handleLogin} errors={errors} />
            
            {user && <UserInfo user={user} />}

            <Dashboard products={filteredProducts} onSearch={handleSearch} />

            {/* Optionally keep these if you want separate detailed views */}
            <ProductDetail product={productOne} />

            {/* Note: You might want to remove these lists if they are not necessary now that you have the Dashboard */}
            {/* 
            <ProductList title="All Products by Category *furniture filter*" products={allProductsByCategory} />
            <ProductList title="All Products by Description *furniture filter*" products={allProductsByDescription} />
            */}
        </>
    );
}

export default App;
