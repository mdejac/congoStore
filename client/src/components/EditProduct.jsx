import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useParams } from 'react-router-dom';
const EditProduct = (props) => {
    const { productOne, setProductOne } = props;

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
    const changeHandler = (e) => {
        setProductOne({ ...productOne, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/products/${products._id}`, productOne)
            .then(res => {
                console.log(res.data, "res.data");
                navigate('/products');
            })
            .catch(err => {
                console.log(err);
                console.log(err, "errors")
                // const errArray = [];
                // for (const key of Object.keys(err.response.data.errors)) {
                //     errArray.push(err.response.data.errors[key].message)
                // }
                // setErrors(errArray);
                setErrors(err.response.data.error.errors);
            })
    }
    return (
        <div>
            <p>Edit a Product</p>
            {/* <form onSubmit={onSubmitHandler}>
                <div>
                    <label for="category">Category</label>
                    <br />
                    <select name="category" id="cars">
                        <option value={productOne.category} name="category" onChange={changeHandler} />
                    </select>
                </div>
                <div>
                    <label>Description</label>
                    <br />
                    <input type="text" value={productOne.description} name="description" onChange={changeHandler} />
                </div>
                <div>
                    <label>Image</label>
                    <br />
                   
                    <input type="url" value={productOne.img_url} name="img_urg" onChange={changeHandler} />
                </div>
                <div>
                    <label>Price</label>
                    <br />
                    <input type="number" value={productOne.price} name="price" onChange={changeHandler} />
                </div>
                <div>
                    <label>Quantity</label>
                    <br />
                    <input type="text" value={productOne.quantity} name="quantity" onChange={changeHandler} />
                </div>

            </form> */}
        </div>
    )
}

export default EditProduct