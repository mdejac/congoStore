import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegLog from "./components/RegLog";
import Dashboard from './components/Dashboard';
import ProductCreate from "./components/ProductCreate";


function App() {
    
    return (
        <BrowserRouter>
            <div className='App'>
                <h1 >Congo Superstore</h1>           
            <Routes>
                <Route path="/" element={<RegLog/>} />
                <Route path="/products" element={<Dashboard/>} />
                <Route path="/products/create" element={<ProductCreate/>} />
            </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;