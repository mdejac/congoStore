import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

// import SearchBar from "./SearchBar";
// import ProductList from "./ProductList";

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          setUser(loggedInUser);
        }
        else {
            navigate("/");
        }
      }, []);
    
    return (
        <div className="dashboard">
            <h1>THIS IS THE DASHBOARD</h1>
            {/* <SearchBar onSearch={onSearch} />
            <div className="product-grid">
                <ProductList title="All Products" products={products} />
            </div> */}
        </div>
    );
}

export default Dashboard;
