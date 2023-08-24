import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const FormStyles = `mb-3 rounded-lg bg-primary-300 px-5 py-3 placeholder-white`

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchTerm("");
        navigate(`/products/search/${searchTerm}`);
    };

    return (
        <form className="flex items-center" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search for products..."
                className={FormStyles}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className='mb-3 rounded-lg bg-secondary-300 px-5 py-3 transition duration-500 hover:text-white' type="submit">Search</button>
        </form>
    );
}

export default SearchBar;
