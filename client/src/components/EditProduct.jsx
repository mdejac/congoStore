import React, { useState, useEffect } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import LoginPic from "../assets/congo.png";

const EditProduct = () => {
    const [user, setUser] = useState();
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const navigate = useNavigate();
    const [productEditErrors, setProductEditErrors] = useState([]);
    const FormStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`

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
        axios.get(`http://localhost:5000/api/products/${id}`)
            .then(res => {
                console.log(res.data, "res.data")
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err.response)
                res.statu(400).json(err);
            })
    }, [id])
    
    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/products/${id}`, product)
            .then(res => {
                console.log(res.data, "res.data");
                navigate('/products');
            })
            .catch(err => {
                console.log(err);
                console.log(err, "errors")
                const errArray = [];
                for (const key of Object.keys(err.response.data.errors)) {
                    errArray.push(err.response.data.errors[key].message)
                }
                setProductEditErrors(errArray);
                setProductEditErrors(err.response.data.error.errors);
            })
    }
    return (
        <div className='md:flex justify-around items-center bg-secondary-100 rounded-lg p-10 mt-15'>
        <div>
            <img src={LoginPic} alt="congopic" 
            className='w-[750px] rounded-md'/>
        </div>
        <h1 className='text-center text-2xl text-white'>
                    Edit Product
        </h1>
        <form className='bg-primary-500 p-10 rounded-lg' onSubmit={onSubmitHandler}>
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-black dark:text-black">Product Name:</label>
                {productEditErrors['name'] && (
                <p style={{ color: 'red' }}>{productEditErrors['name']}</p>
                )}
                <input className={FormStyles}
                    id='name'
                    placeholder='Product Name'
                    type="text"
                    value={product.name}
                    onChange={(e) => setProduct({...product, name: e.target.value})} />
            </div>
            <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-black dark:text-black">Categories:</label>
                {productEditErrors['category'] && (
                <p style={{ color: 'red' }}>{productEditErrors['category']}</p>
                )}
                <input id='category' placeholder='Electronics, Home Goods, Gadgets...' className={FormStyles} type="text" value={product.category} onChange={(e) => setProduct({...product, category: e.target.value})} />
           </div>
            <div>
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-black dark:text-black">Description:</label>
                {productEditErrors['description'] && (
                <p style={{ color: 'red' }}>{productEditErrors['description']}</p>
                )}
                <textarea id='description' className={FormStyles} type="textarea" rows={4} cols={50} value={product.description} onChange={(e) => setProduct({...product, description: e.target.value})} />
           </div>
           <div>
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-black dark:text-black">Price</label>
                {productEditErrors['price'] && (
                <p style={{ color: 'red' }}>{productEditErrors['price']}</p>
                )}
                <div className="relative">
                    <span className="absolute left-2 top-3 text-gray-600 dark:text-gray-300">$</span>
                    <input
                        id="price"
                        placeholder="0.00"
                        className={`block ${FormStyles} pl-8`}
                        type="number"
                        min="0.00"
                        step=".01"
                        value={parseFloat(product.price).toFixed(2)}
                        onChange={(e) =>
                            setProduct({
                                ...product,
                                price: e.target.value
                            })
                        }
                    />
                </div>
            </div>
            <div>
                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-black dark:text-black">Quantity</label>
                {productEditErrors['quantity'] && (
                <p style={{ color: 'red' }}>{productEditErrors['quantity']}</p>
                )}
                <input id='quantity' placeholder='0' className={FormStyles} type="number" value={product.quantity} onChange={(e) => setProduct({...product, quantity: e.target.value})} />
            </div>
            <div>
            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-black dark:text-black">Image Upload:</label>
                {productEditErrors['img_url'] && (
                <p style={{ color: 'red' }}>{productEditErrors['img_url']}</p>
                )}
                <input className={FormStyles} disabled={true} type="multipart-file" value={product.img_url} onChange={(e) => setProduct({...product, img_url: e.target.value})} />
            </div>
            <button className='className="mt-5 rounded-lg bg-secondary-300 px-20 py-3 transition duration-500 hover:text-white' type="submit">Submit</button>
        </form>
      </div>
    )
}

export default EditProduct