
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginForm from './components/LoginForm';
import UserInfo from "./components/UserInfo";
import ProductDetail from "./components/ProductDetail";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import RegLog from "./components/RegLog";
import ReviewProduct from "./components/ReviewProduct";
import NotFound from "./components/NotFound";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import SearchBar from './components/SearchBar';
import ProductSellForm from './components/ProductSellForm';
import Dashboard from './components/Dashboard';

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
    const [allProductsByCategory, setAllProductsByCategory] = useState([]);
    const [allProductsByDescription, setAllProductsByDescription] = useState([]);
    const [productOne, setProductOne] = useState({});
    const [user, setUser] = useState({});
    const [cart, setCart] = useState({});
    const [allCarts, setAllCarts] = useState({});
    const [errors, setErrors] = useState({});
    const [review, setReview] = useState({});
    const [allReviews, setAllReviews] = useState({});

    return (
        <BrowserRouter>
            <div className='App'>
                <h1 >Congo Superstore</h1>
                <h2>Welcome {user.name}</h2>
                <SearchBar onSearch={/* Function to handle search goes here */} />
                
                <Routes>
                    <Route path="/" element={<RegLog errors={errors} setErrors={setErrors} />} />
                    <Route path="/products" element={<ProductList allProducts={allProducts} setAllProducts={setAllProducts} cart={cart} setCart={setCart} />} />
                    <Route path="/products/:id" element={<ProductDetail productOne={productOne} setProductOne={setProductOne} review={review} setReview={setReview} allReviews={setAllReviews} />} />
                    <Route path="/users/:id" element={<UserInfo cart={cart} setCart={setCart} allCarts={allCarts} setAllCarts={setAllCarts} errors={errors} setErrors={setErrors} user={user} setUser={setUser} />} />
                    <Route path="/users/:user._id/:cart._id" element={<Cart cart={cart} user={user} allProducts={allProducts} setAllProducts={allProducts} />} />
                    <Route path="/users/:user._id/:product._id" element={<EditProduct user={user} setUser={setUser} productOne={productOne} setProductOne={setProductOne} />} />
                    <Route path="/products/create/" element={<AddProduct user={user} setUser={setUser} allProducts={allProducts} setAllProducts={setAllProducts} />} />
                    <Route path="/products/:product._id/review" element={<ReviewProduct productOne={productOne} setProductOne={setProductOne} review={review} setReview={setReview} />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/sell" component={ProductSellForm} />
                    <Route path="/dashboard">
                        <Dashboard />
                        <ProductList title="Products" products={/* Products data should come from a source, e.g., API, state, etc. */} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}


useEffect(() => {
    const fetchData = async () => {
        try {
            const products = await fetchAllProducts();
            setAllProducts(products.data);

            const productsByCategory = await fetchProductsByCategory('furniture');
            setAllProductsByCategory(productsByCategory.data);

            const productsByDescription = await fetchProductsByDescription('furniture');
            setAllProductsByDescription(productsByDescription.data);

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

return (
    <>
        <LoginForm onLogin={handleLogin} errors={errors} />

        <UserInfo user={user} />

        <ProductDetail product={productOne} />

        <ProductList title="All Products by Category *furniture filter*" products={allProductsByCategory} />

        <ProductList title="All Products by Description *furniture filter*" products={allProductsByDescription} />

        <ProductList title="All Products" products={allProducts} />
    </>
);

}

export default App;
