import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Cart = (props) => {
    // const { cart._id } = useParams();
    const { cart, setCart, user, setUser, allProducts, setAllProducts } = props;

    useEffect(() => {
        // console.log(user, "user")
        axios.get(`http://localhost:5000/api/users/${user._id}/${cart._id}`)
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
            {
                allProducts.map((product, index) => (key = { cart._id })
                    < p > { user.name }'s cart</p>

            }
        </div>
    )
}

export default Cart