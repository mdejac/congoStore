import React, {useState} from 'react'

import axios from 'axios';

const ProductCreate = () => {
    const [product, setProduct] = useState({});

    const [productCreateErrors, setProductCreateErrors] = useState([]);

    const initialProductCreateState = {
        name : "",
        category : "",
        description : "",
        price : 0.00,
        quantity : 0,
        img_url : "/img/default.png"
    }

    const [productCreateInfo, setProductCreateInfo] = useState(initialProductCreateState)
    const handleProductCreateSubmit = async (e) => {
        e.preventDefault();
    
        // user_id should come from state, the logged in user's id
        // /img/default.png is required until image upload works.
        const data = {
            user_id : 3,
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

            setProduct(response.data)
            /*This will now hold a user object will have :
                id
                name
                category
                description
                price
                quantity
                creator : {
                    id
                    first_name
                    last_name
                    address
                    email
                    created_at
                    updated_at
                }
                created_at
                updated_at
            */
          }
        } catch (error) {
            console.error('Error:', error);
        }
      };

    return (
        <div>
        <h1>Create Product Form</h1>
        <form onSubmit={handleProductCreateSubmit}>
            <div>
                <label>Name:</label>
                {productCreateErrors['name'] && (
                <p style={{ color: 'red' }}>{productCreateErrors['name']}</p>
                )}
                <input type="text" value={productCreateInfo.name} onChange={(e) => setProductCreateInfo({...productCreateInfo, name: e.target.value})} />
            </div>
            <div>
                <label>Category:</label>
                {productCreateErrors['category'] && (
                <p style={{ color: 'red' }}>{productCreateErrors['category']}</p>
                )}
                <input type="text" value={productCreateInfo.category} onChange={(e) => setProductCreateInfo({...productCreateInfo, category: e.target.value})} />
           </div>
            <div>
                <label>Description:</label>
                {productCreateErrors['description'] && (
                <p style={{ color: 'red' }}>{productCreateErrors['description']}</p>
                )}
                <textarea type="textarea" rows={4} cols={50} value={productCreateInfo.description} onChange={(e) => setProductCreateInfo({...productCreateInfo, description: e.target.value})} />
           </div>
           <div>
                <label>Price:</label>
                {productCreateErrors['price'] && (
                <p style={{ color: 'red' }}>{productCreateErrors['price']}</p>
                )}
                <input type="int" min="0" step=".01" value={productCreateInfo.price} onChange={(e) => setProductCreateInfo({...productCreateInfo, price: e.target.value})} />
           </div>
            <div>
                <label>Qty:</label>
                {productCreateErrors['quantity'] && (
                <p style={{ color: 'red' }}>{productCreateErrors['quantity']}</p>
                )}
                <input type="quantity" value={productCreateInfo.quantity} onChange={(e) => setProductCreateInfo({...productCreateInfo, quantity: e.target.value})} />
            </div>
            <div>
                <label>Image Upload:</label>
                {productCreateErrors['img_url'] && (
                <p style={{ color: 'red' }}>{productCreateErrors['img_url']}</p>
                )}
                <input disabled="true" type="text" value={productCreateInfo.img_url} onChange={(e) => setProductCreateInfo({...productCreateInfo, img_url: e.target.value})} />
            </div>
            <button type="submit">Submit</button>
        </form>
      </div>
    )
}

export default ProductCreate