import React, { useState } from 'react'
import axios from 'axios';

const ReviewForm = ({user_id, product_id, onReviewSubmit}) => {
    const [review, setReview ] = useState({
        user_id : user_id,
        product_id : product_id,
        content: "",
        rating: ""
    });
    const [errors, setErrors] = useState([]);
    const FormStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`

    const changeHandler = (e) => {
        setReview({ ...review, [e.target.name]: e.target.value })
    }

    const ReviewProduct = (e) => {
        e.preventDefault();
        console.log(review)
        axios.post(`http://localhost:5000/api/reviews/create`, review)
            .then(res => {
                console.log(res.data);
                setReview({...review, 'content':"", 'rating':""})
                if (typeof onReviewSubmit === 'function') {
                    onReviewSubmit();
                }
            })
            .catch(err => {
                console.log(err);
                const errArray = [];
                for (const key of Object.keys(err.response.data.errors)) {
                    errArray.push(err.response.data.errors[key].message)
                }
                setErrors(errArray);
            })
    }
    
    return (
        <div className='md:flex justify-around items-center bg-secondary-100 rounded-lg p-10 mt-15'>
            <form className='bg-primary-500 p-10 rounded-lg' onSubmit={ReviewProduct}>
                <div>
                    <label >Leave a review</label>
                    <textarea className={FormStyles} rows={4} cols={50} value={review.content} name="content" onChange={changeHandler} />
                </div>
                <div>
                    <select className={FormStyles} value={review.rating} name="rating" onChange={changeHandler} >
                        <option >Select a rating</option>
                        <option value="*">*</option>
                        <option value="**">**</option>
                        <option value="***">***</option>
                        <option value="****">****</option>
                        <option value="*****">*****</option>
                    </select>
                    <button className='className="mt-5 rounded-lg bg-secondary-300 px-20 py-3 transition duration-500 hover:text-white' type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default ReviewForm;