import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = (props) => {
    // const {products._id}=useParams();
    const { product, setProduct } = props;
    const navigate = useNavigate();
    const { review, setReview } = useState({
        content: "",
        rating: ""
    })
    const [errors, setErrors] = useState([]);

    const changeHandler = (e) => {
        setReview({ ...review, [e.target.name]: e.target.value })
    }
    const ReviewProduct = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/reviews/${product._id}` / create, review, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                navigate('/products');
            })
            .catch(err => {
                console.log(err);
                const errArray = [];
                for (const key of Object.keys(err.response.data.errors)) {
                    errArray.push(err.response.data.errors[key].message)
                }
                setErrors(errArray);
            })
        useEffect(() => {
            axios.get(`http://localhost:5000/api/products/${products._id}`)
                .then(res => {
                    console.log(res.data, "res.data")
                    setProduct(res.data);
                })
                .catch((err) => {
                    console.log(err.response)
                    res.statu(400).json(err);
                })
        }, [])


    }
    return (
        <div>
            <h1>Single Product Axios Call</h1>
            {/* {Object.keys(product).length > 0 ? ( */}
            <div>
                <p>ID: {product._id}</p>
                <p>Name: {product.name}</p>
                <p>Category: {product.category}</p>
                <p>Description: {product.description}</p>
                {/* <p>Posted By: {product.creator.first_name} {product.creator.last_name}</p> */}
                <p>Quantity: {product.quantity}</p>
                <p>Price: {product.price}</p>
                <p>Reviews:</p>
                <ul>
                    {product.reviews.map((review, index) => (
                        <li key={index}>
                            <p>Content: {review.content}</p>
                            <p>Rating: {review.rating}</p>
                            {/* <p>Posted By: {review.creator.first_name}</p> */}
                        </li>
                    ))}
                </ul>
            </div>
            {/* ) : ( */}
            {/* <p>Loading...</p> */}
            {/* )} */}
            <div>
                <form onSubmit={ReviewProduct}>
                    <div>
                        <label >Leave a review</label>
                        <br />
                        <input type="text" value={review.content} name="content" onChange={changeHandler} />
                    </div>
                    <div>
                        <label >Rate this product on a scale from 1 to 5 with 5 being the highest rating value</label>
                        <br />
                        <input type="text" value={review.rating} name="rating" onChange={changeHandler} />
                    </div>
                </form>
            </div>
        </div>
    );
}
}

export default ProductDetail;
