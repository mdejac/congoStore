import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

import ProductScroll from "../components/ProductScroll";

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState();

    const categories = {
        1 : 'Back to School',
        2 : 'Computers',
        3 : 'Electronics',
        4 : 'Furniture'
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser.user);
        }
        else {
            navigate("/");
        }
    }, []);
   
    return (
        <div className="dashboard">
            <h1> </h1> <br/>
            {Object.keys(categories).map((categoryId) => (
                <ProductScroll 
                key={categoryId} 
                searchType={categories[categoryId]}
                className="mt-5"/>
            ))}
        </div>
    );
}

export default Dashboard;
