import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importing components
import LoginForm from './components/LoginForm';
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList';
import SearchBar from './components/SearchBar';
import ProductSellForm from './components/ProductSellForm';
import Dashboard from './components/Dashboard';
import UserInfo from './components/UserInfo';


function App() {
    return (
        <div className='App'>
            <BrowserRouter>
              
                    {/* <SearchBar onSearch=Function to handle search goes here /> */}   
                    <Routes>
                        {/* Route for the main landing page, which is the login/registration form */}
                        <Route path="/" Component={LoginForm} />

                        {/* Route to display the dashboard */}
                        <Route path="/dashboard" Component={Dashboard}/>

                        {/* Route for product details when a user clicks on a product */}
                        <Route path="/product/:id" Component={ProductDetail} />


                        {/* Route for sellers to list a new product */}
                        <Route path="/sell" Component={ProductSellForm} />

                        {/* Route for user information */}
                        <Route path="/user/:id" Component={UserInfo} />
                    </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
