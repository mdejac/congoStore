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
    <button onClick={handleLogout}>logout</button>
    )
}

export default Logout;