import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserInfo = (props) => {
    const { id } = useParams();
    const { user, setUser, cart, setCart, allCarts, setAllCarts } = props;
    useEffect(() => {
        console.log(user, "user")
        axios.get(`http://localhost:5000/api/users/${user._id}`)
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

    useEffect(() => {
        console.log(carts, "user")
        axios.get(`http://localhost:5000/api/users/${user._id}/carts`)
            .then(res => {
                console.log(res.data, "res.data")
                console.log()
                setAllCarts(res.data);
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
                <button><Link to="/products" >Congo Products</Link></button>
            </div>

            <div>
                <p>{user.first_name}</p>
                <p>{user.last_name}</p>
                <p>{user.address}</p>
                <p>{user.email}</p>
            </div>
            <div>
                <ul>
                    {allCarts.map((cart, index) => (
                        <li key={index}>
                            <p>Item: {cart.product}</p>
                            {/* Link here?  */}

                        </li>
                    ))}
                </ul>
                {/* <ul>
                    {product.reviews.map((review, index) => (
                        <li key={index}>
                            <p>Content: {review.content}</p>
                            <p>Rating: {review.rating}</p>
                            {/* <p>Posted By: {review.creator.first_name}</p> */}
                {/* </li> */}
                {/* ))} */}
                {/* </ul> * /} */}
            </div >


        </div >
    );
}

export default UserInfo;
