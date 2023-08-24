import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Logout = () => {

    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          setUser(loggedInUser);
        }
        else {
            navigate("/");
        }
      }, []);

      const handleLogout = () => {
        setUser({});
        localStorage.clear();
        navigate("/")
      };

   
  return (
    <button 
    className='className="rounded-lg bg-primary-300 px-5 py-3 transition duration-500 hover:text-white'
    onClick={handleLogout}>Logout
    </button>
    )
}

export default Logout;