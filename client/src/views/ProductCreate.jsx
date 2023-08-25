import React, {useEffect, useState} from 'react'
import axios from 'axios';
import LoginPic from "../assets/congo.png";
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';

const ProductCreate = () => {
    const FormStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`;
    const initialState = {
        user_id : 3,
        name : "",
        category : "",
        description : "",
        price : 0.00,
        quantity : 0,
        img_url : "/img/default.png"
    };

    const [user, setUser] = useState({});
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

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
    
    
    const createProduct = async (formData) => {
        const data = {
            user_id : user.id,
            name : formData.name,
            category : formData.category,
            description : formData.description,
            price : formData.price,
            quantity : formData.quantity,
            img_url : "/img/default.png"
        };
        try {
          const response = await axios.post('http://127.0.0.1:5000/api/products/create', data);
          console.log('Response:', response.data);
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors([])
            navigate('/products')
          }
        } catch (error) {
            console.error('Error:', error);
        };
    }    
    
    return (
        <div className='md:flex justify-around items-center bg-secondary-100 rounded-lg p-10 mt-15'>
        <div>
            <img src={LoginPic} alt="congopic" 
            className='w-[750px] rounded-md'/>
        </div>
        <h1 className='text-center text-2xl text-white'>
                    Sell On <span className='italic'>Congo</span>
        </h1>
            <ProductForm title={'Create'} initialState={initialState} onSubmitProps={createProduct} errors={errors}/>
      </div>
    )
}

export default ProductCreate