import React, {useEffect, useState} from 'react'
import axios from 'axios';
import LoginPic from "../assets/congo.png";
import { useNavigate } from 'react-router-dom';

const ProductCreate = () => {
    const [productCreateErrors, setProductCreateErrors] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    const FormStyles = `mb-5 w-full rounded-lg bg-primary-300 px-5 py-3 placeholder-white`
    const initialProductCreateState = {
        name : "",
        category : "",
        description : "",
        price : 0.00,
        quantity : 0,
        img_url : "/img/default.png"
    }


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
    
    
    const [productCreateInfo, setProductCreateInfo] = useState(initialProductCreateState)
    const handleProductCreateSubmit = async (e) => {
        e.preventDefault();
    
        // /img/default.png is required until image upload works.
        const data = {
            user_id : user.id,
            name : productCreateInfo.name,
            category : productCreateInfo.category,
            description : productCreateInfo.description,
            price : productCreateInfo.price,
            quantity : productCreateInfo.quantity,
            img_url : "/img/default.png"
        };
        try {
          const response = await axios.post('http://127.0.0.1:5000/api/products/create', data);
          console.log('Response:', response.data);
          if (response.data.errors) {
            setProductCreateErrors(response.data.errors);
          } else {
            setProductCreateErrors({})
            setProductCreateInfo(initialProductCreateState)
            navigate('/products')
          }
        } catch (error) {
            console.error('Error:', error);
        }
      };

    return (
        <div className='md:flex justify-around items-center bg-secondary-100 rounded-lg p-10 mt-15'>
        <div>
            <img src={LoginPic} alt="congopic" 
            className='w-[750px] rounded-md'/>
        </div>
        <h1 className='text-center text-2xl text-white'>
                    Sell On <span className='italic'>Congo</span>
        </h1>
        <form className='bg-primary-500 p-10 rounded-lg' onSubmit={handleProductCreateSubmit}>
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-black dark:text-black">Product Name:</label>
                {productCreateErrors['name'] && (
                <p style={{ color: 'red' }}>{productCreateErrors['name']}</p>
                )}
                <input className={FormStyles}
                    id='name'
                    placeholder='Product Name'
                    type="text"
                    value={productCreateInfo.name}
                    onChange={(e) => setProductCreateInfo({...productCreateInfo, name: e.target.value})} />
            </div>
            <div>
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-black dark:text-black">Categories:</label>
                {productCreateErrors['category'] && (
                <p style={{ color: 'red' }}>{productCreateErrors['category']}</p>
                )}
                <input id='category' placeholder='Electronics, Home Goods, Gadgets...' className={FormStyles} type="text" value={productCreateInfo.category} onChange={(e) => setProductCreateInfo({...productCreateInfo, category: e.target.value})} />
           </div>
            <div>
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-black dark:text-black">Description:</label>
                {productCreateErrors['description'] && (
                <p style={{ color: 'red' }}>{productCreateErrors['description']}</p>
                )}
                <textarea id='description' className={FormStyles} type="textarea" rows={4} cols={50} value={productCreateInfo.description} onChange={(e) => setProductCreateInfo({...productCreateInfo, description: e.target.value})} />
           </div>
           <div>
                <label htmlFor="price" className="block mb-2 text-sm font-medium text-black dark:text-black">Price</label>
                {productCreateErrors['price'] && (
                <p style={{ color: 'red' }}>{productCreateErrors['price']}</p>
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
                        value={parseFloat(productCreateInfo.price).toFixed(2)}
                        onChange={(e) =>
                            setProductCreateInfo({
                                ...productCreateInfo,
                                price: e.target.value
                            })
                        }
                    />
                </div>
            </div>
            <div>
                <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-black dark:text-black">Quantity</label>
                {productCreateErrors['quantity'] && (
                <p style={{ color: 'red' }}>{productCreateErrors['quantity']}</p>
                )}
                <input id='quantity' placeholder='0' className={FormStyles} type="number" value={productCreateInfo.quantity} onChange={(e) => setProductCreateInfo({...productCreateInfo, quantity: e.target.value})} />
            </div>
            <div>
            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-black dark:text-black">Image Upload:</label>
                {productCreateErrors['img_url'] && (
                <p style={{ color: 'red' }}>{productCreateErrors['img_url']}</p>
                )}
                <input className={FormStyles} disabled={true} type="multipart-file" value={productCreateInfo.img_url} onChange={(e) => setProductCreateInfo({...productCreateInfo, img_url: e.target.value})} />
            </div>
            <button className='className="mt-5 rounded-lg bg-secondary-300 px-20 py-3 transition duration-500 hover:text-white' type="submit">Submit</button>
        </form>
      </div>
    )
}

export default ProductCreate