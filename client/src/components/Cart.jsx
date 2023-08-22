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
                setCart(res.data);
            })
            .catch((err) => {
                console.log(err.response);
                res.status(400).json(err);

            })
    }, [])
    return (
        <div>
            < p > {user.name}'s cart</p>
            {
                allProducts.map((product, index) => (<div key={cart._id}>
                    <p>Product: {product.name}</p>
                    {/* <p>{product.image}</p> */}
                    <p>Price: {product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Total: {product.price} x {product.quantity}</p>
                </div>))



            }
        </div>
    )
}

export default Cart