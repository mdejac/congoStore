import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import LoginPic from "../assets/congo.png";

const ProductEdit = () => {
  const {id} = useParams();
  const [product, setProduct] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  // Route Protection - Remove once REDUX is installed
  const [user, setUser] = useState();
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
  // **************************************************

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/view/${id}`)
        .then(res => {
            console.log(res.data, "res.data")
            setProduct(res.data);
            setLoaded(true);
        })
        .catch((err) => {
            console.log(err.response)
            res.status(400).json(err);
        })
  }, [])

  const editProduct = async (formData) => {
    const data = {
        user_id : user.id,
        product_id: id,
        name : formData.name,
        category : formData.category,
        description : formData.description,
        price : formData.price,
        quantity : formData.quantity,
        img_url : "/img/default.png"
    };
    try {
      const response = await axios.put(`http://127.0.0.1:5000/api/products/edit/${id}`, data);
      if (response.data.errors) {
        setErrors(response.data.errors);
      } else {
        setErrors([]);
        navigate(`/products/view/${id}`);
      }
    } catch (error) {
        console.error('Error:', error);
    };
} 

  return (
    <div>
      <div className='md:flex justify-around items-center bg-secondary-100 rounded-lg p-10 mt-15'>
        <div>
          <img src={LoginPic} alt="congopic" 
          className='w-[750px] rounded-md'/>
        </div>
        <h1 className='text-center text-2xl text-white'>Sell On <span className='italic'>Congo</span></h1>
        {loaded && <ProductForm title={'Edit'} initialState={product} onSubmitProps={editProduct} errors={errors}/>}
      </div>
    </div>

  )
}

export default ProductEdit