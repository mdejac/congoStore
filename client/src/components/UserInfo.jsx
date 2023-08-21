import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserInfo = (props) => {
    const { id } = useParams();
    const { user, setUser } = props;
    useEffect(() => {
        console.log(user, "user")
        axios.get(`http://localhost:8000/api/users/${user._id}/${cart._id}`)
            .then(res => {
                console.log(res.data, "res.data")
                console.log()
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err.response);
                res.status(400).json(err);

            })
    }, [])
    return (
        <div>
            <div>
                <h1>Welcome {user.first_name}</h1>
                <button><Link to="/products" />Congo Products</button>
            </div>

            <div>
                <p>{user.first_name}</p>
                <p>{user.last_name}</p>
                <p>{user.address}</p>
                <p>{user.email}</p>
            </div>
        </div>
    );
}

export default UserInfo;
