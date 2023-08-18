import React, { useState, useEffect } from "react";
import axios from 'axios';
// import './App.css'

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [allProductsByCategory, setAllProductsByCategory] = useState([]);
  const [allProductsByDescription, setAllProductsByDescription] = useState([]);
  const [productOne, setProductOne] = useState({});
  const [user, setUser] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({})

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/products')
      .then(response => {
        setAllProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/products/category/furniture')
      .then(response => {
        setAllProductsByCategory(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/products/description/furniture')
      .then(response => {
        setAllProductsByDescription(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/products/view/4')
      .then(response => {
        setProductOne(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/users/1')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/users/login', data);
      console.log('Response:', response.data);
      if (response.data.errors) {
        console.log("setting state")
        setErrors(response.data.errors);
      } else {
        setErrors({})
      }
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <>
      <div>
        <h1>Login Form</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            {errors['email'] && (
              <p style={{ color: 'red' }}>{errors['email']}</p>
            )}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            {errors['password'] && (
              <p style={{ color: 'red' }}>{errors['password']}</p>
            )}
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>

      <div>
      <h1>User Info Axios Call</h1>
      <p>{user.id}</p>
      <p>{user.first_name}</p>
      <p>{user.last_name}</p>
      <p>{user.address}</p>
      <p>{user.email}</p>
      </div>

      <div>
      <h1>Single Product Axios Call</h1>
      {Object.keys(productOne).length > 0 ? (
        <div>
          <p>ID: {productOne.id}</p>
          <p>Name: {productOne.name}</p>
          <p>Category: {productOne.category}</p>
          <p>Description: {productOne.description}</p>
          <p>Posted By: {productOne.creator.first_name} {productOne.creator.last_name}</p>
          <p>Quantity: {productOne.quantity}</p>
          <p>Price: {productOne.price}</p>
          <p>Reviews:</p>
          <ul>
            {productOne.reviews.map((review, index) => (
              <li key={index}>
                <p>Content: {review.content}</p>
                <p>Rating: {review.rating}</p>
                <p>Posted By: {review.creator.first_name}</p>
              </li>
            ))}
          </ul>
        </div>
        ) : (
          <p>Loading...</p>
      )}
</div>

      <div>
        <h1>All Products by Category *furinture filter* Axios Call</h1>
        <ul>
          {allProductsByCategory.map((product) => (
            <li key={product.id}>
              <p>ID: {product.id}</p>
              <p>Name: {product.name}</p>
              <p>Category: {product.category}</p>
              <p>Description: {product.description}</p>
              <p>Posted By: {product.creator.first_name} {product.creator.last_name}</p>
              <p>Quantity: {product.quantity}</p>
              <p>price: {product.price}</p>
              <p>reviews</p>
              <ul>
                {product.reviews.map((review, index) => (
                  <li key={index}>
                    <p>Content : {review.content}</p>
                    <p>Rating : {review.rating}</p>
                    <p>Posted By : {review.creator.first_name}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1>All Products by Description *furinture filter* Axios Call</h1>
        <ul>
          {allProductsByDescription.map((product) => (
            <li key={product.id}>
              <p>ID: {product.id}</p>
              <p>Name: {product.name}</p>
              <p>Category: {product.category}</p>
              <p>Description: {product.description}</p>
              <p>Posted By: {product.creator.first_name} {product.creator.last_name}</p>
              <p>Quantity: {product.quantity}</p>
              <p>price: {product.price}</p>
              <p>reviews</p>
              <ul>
                {product.reviews.map((review, index) => (
                  <li key={index}>
                    <p>Content : {review.content}</p>
                    <p>Rating : {review.rating}</p>
                    <p>Posted By : {review.creator.first_name}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1>All Products Axios Call</h1>
        <ul>
          {allProducts.map((product) => (
            <li key={product.id}>
              <p>ID: {product.id}</p>
              <p>Name: {product.name}</p>
              <p>Category: {product.category}</p>
              <p>Description: {product.description}</p>
              <p>Posted By: {product.creator.first_name} {product.creator.last_name}</p>
              <p>Quantity: {product.quantity}</p>
              <p>price: {product.price}</p>
              <p>reviews</p>
              <ul>
                {product.reviews.map((review, index) => (
                  <li key={index}>
                    <p>Content : {review.content}</p>
                    <p>Rating : {review.rating}</p>
                    <p>Posted By : {review.creator.first_name}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
