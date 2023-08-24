import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Dashboard from './components/Dashboard';
import ProductCreate from "./components/ProductCreate";
import Login from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Navbar from "./components/Navbar";
import ProductDetail from "./components/ProductDetail";
import SearchResultView from "./components/SearchResultView";
import EditProduct from "./components/EditProduct";

function App() {
    
    return (
        <BrowserRouter>
            <div className='App'>
                <div className="mb-20">
                    <Navbar/>
                </div>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/register" element={<RegistrationForm/>} />
                <Route path="/products" element={<Dashboard/>} />
                <Route path="/products/view/:id" element={<ProductDetail/>} />
                <Route path="/products/create" element={<ProductCreate/>} />
                <Route path="/products/search/:searchTerm" element={<SearchResultView/>} />
                <Route path="/products/edit/:id" element={<EditProduct/>} />
            </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;