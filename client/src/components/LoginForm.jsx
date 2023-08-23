import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
    //How to save this for use everwhere
    const [user, setUser] = useState({});
  
  
    const [loginErrors, setLoginErrors] = useState([]);

    const [loginInfo, setLoginInfo] = useState({
        email : "",
        password : ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = {
          email: loginInfo.email,
          password: loginInfo.password,
        };
    
        try {
          console.log('Data', data)  
          const response = await axios.post('http://127.0.0.1:5000/api/users/login', data);
          if (response.data.errors) {
            setLoginErrors(response.data.errors);
          } else {
            setLoginErrors({})
            setLoginInfo({email:"", password:""})
            
            setUser(response.data)
            /*This will now hold a user object will have :
                id
                first_name
                last_name
                address
                email
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
        <h1>Login Form</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            {loginErrors['email'] && (
              <p style={{ color: 'red' }}>{loginErrors['email']}</p>
            )}
            <input type="email" value={loginInfo.email} onChange={(e) => setLoginInfo({...loginInfo, email: e.target.value})} />
          </div>
          <div>
            <label>Password:</label>
            {loginErrors['password'] && (
              <p style={{ color: 'red' }}>{loginErrors['password']}</p>
            )}
            <input type="password" value={loginInfo.password} onChange={(e) => setLoginInfo({...loginInfo, password: e.target.value})} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
}

export default Login