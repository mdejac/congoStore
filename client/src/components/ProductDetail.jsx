import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';

const ProductDetail = () => {
    const [user, setUser] = useState();
    const {id} = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [reviewSubmission, setReviewSubmission] = useState(false);

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

    useEffect(() => {
        const fetchProductData = () => {
            axios.get(`http://127.0.0.1:5000/api/products/view/${id}`)
                .then(response => {
                    setProduct(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };
        fetchProductData();
    }, [id, reviewSubmission]);

    const handleReviewSubmission = () => {
        setReviewSubmission(prevState => !prevState);
    };

    return (
        <div className='bg-secondary-100 text-white'>
            <h1> </h1> <br/>
            <h1 className='text-center font-extrabold text-2xl text-primary-500 py-5'>{product.name}</h1>
            {Object.keys(product).length > 0 ? (
                <div className='md:flex justify-around'>
                    <div>

                        <p>Product ID: {product.id}</p>
                        <p>Category: {product.category}</p>
                        <p>Description: {product.description}</p>
                        <p>Seller: {product.creator.first_name} {product.creator.last_name}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>Price: ${product.price}</p>
                        <Link to="/products">
                            <button className='className="mt-5 rounded-lg bg-primary-300 px-20 py-3 transition duration-500 hover:text-white'>
                                Home
                            </button>
                        </Link>
                    </div>
                    <div>
                        <p>Reviews:</p>
                        <ul>
                            {product.reviews.map((review, index) => (
                                <li key={index}>
                                    <p>Content: {review.content}</p>
                                    <p>Rating: {review.rating}</p>
                                    <p>Posted By: {review.creator.first_name}</p>
                                </li>
                            ))}
                        </ul>
                        <ReviewForm product_id={id} user_id={user.id} onReviewSubmit={handleReviewSubmission}/>
                    </div>
                </div>
             ) : ( 
                <p>Loading...</p> 
             )} 
            
        </div>
    );
}


export default ProductDetail;
