import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Dashboard from './views/Dashboard';
import ProductCreate from "./views/ProductCreate";
import Login from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Navbar from "./components/Navbar";
import ProductDetail from "./views/ProductDetail";
import SearchResult from "./views/SearchResult";
import ProductEdit from "./views/ProductEdit";

function App() {
    
    return (
        <BrowserRouter>
            <div className='App'>
                <div className="mb-20">
                    <Navbar/>
                    <br />
                </div>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/register" element={<RegistrationForm/>} />
                <Route path="/products" element={<Dashboard/>} />
                <Route path="/products/view/:id" element={<ProductDetail/>} />
                <Route path="/products/create" element={<ProductCreate/>} />
                <Route path="/products/search/:searchTerm" element={<SearchResult/>} />
                <Route path="/products/edit/:id" element={<ProductEdit/>} />
            </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;