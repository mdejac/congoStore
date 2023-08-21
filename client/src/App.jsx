import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
        <Router>
            <div>
                <SearchBar onSearch={/* Function to handle search goes here */} />
                
                <Switch>
                    {/* Route for the main landing page, which is the login/registration form */}
                    <Route exact path="/" component={LoginForm} />

                    {/* Route for product details when a user clicks on a product */}
                    <Route path="/product/:id" component={ProductDetail} />

                    {/* Route to display the dashboard */}
                    <Route path="/dashboard">
                        <Dashboard />
                        <ProductList title="Products" products={/* Products data should come from a source, e.g., API, state, etc. */} />
                    </Route>

                    {/* Route for sellers to list a new product */}
                    <Route path="/sell" component={ProductSellForm} />

                    {/* Route for user information */}
                    <Route path="/user/:id" component={UserInfo} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
