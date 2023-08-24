import React, {useEffect, useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../App.css";

import ProductScroll from "./ProductScroll";

// import SearchBar from "./SearchBar";
// import ProductList from "./ProductList";

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [allProducts, setAllProducts] = useState([]);
    const [allProductsByCategory1, setAllProductsByCategory1] = useState([]);
    const [allProductsByCategory2, setAllProductsByCategory2] = useState([]);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          setUser(loggedInUser);
        }
        else {
            navigate("/");
        }
      }, []);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/products')
          .then(response => {
            setAllProducts(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }, []);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/products/category/furniture')
          .then(response => {
            setAllProductsByCategory1(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }, []);
    
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/products/category/back to school')
          .then(response => {
            setAllProductsByCategory2(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }, []);


    
    return (
        <div className="dashboard">
            <ProductScroll searchType='Furniture' products={allProductsByCategory1}/>
            <ProductScroll searchType='Back To School' products={allProductsByCategory2}/>
        </div>
    );
}

export default Dashboard;
