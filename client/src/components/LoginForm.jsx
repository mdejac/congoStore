import React, { useState } from 'react'
import axios from 'axios'
import LoginPic from "../assets/congo.png"
import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom';


// const navigate = useNavigate();
const LoginForm = () => {

  const [user, setUser] = useState({});

    //How to save this for use everwhere
  const navigate = useNavigate();
  const FormStyles = `mb-5 rounded-lg bg-primary-300 px-5 py-3 placeholder-white`
  
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
            localStorage.setItem("user", user);
            navigate("/products");
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
      <div className='md:flex justify-around items-center bg-secondary-100 rounded-lg p-10 mt-25'>
        <div>
          <img 
          src={LoginPic} 
          alt="congopic"
          className='w-[750px] rounded-md' />
        </div>
        <div>
          <h1 className='text-center text-2xl text-white'>
            Welcome to <span className='italic'> Congo</span>
          </h1>
          <h2 className='text-center text-xl text-white'>Login</h2>
          <form onSubmit={handleSubmit}
          className='bg-primary-500 p-10 rounded-lg'>
            <div>
              {loginErrors['email'] && (
                <p style={{ color: 'red' }}>{loginErrors['email']}</p>
              )}
              <input
              id='email'
              className={FormStyles}
              placeholder='EMAIL' 
              type="email" 
              value={loginInfo.email} 
              onChange={(e) => setLoginInfo({...loginInfo, email: e.target.value})} />
            </div>
            <div>
              {loginErrors['password'] && (
                <p style={{ color: 'red' }}>{loginErrors['password']}</p>
              )}
              <input 
              id='password'
              className={FormStyles}
              placeholder='PASSWORD'
              type="password" 
              value={loginInfo.password} 
              onChange={(e) => setLoginInfo({...loginInfo, password: e.target.value})} />
            </div>
            <button 
            type="submit"
            className='mt-5 rounded-lg bg-secondary-300 px-20 py-3 transition duration-500 hover:text-white'
            >Login</button>
          </form>
          <Link 
          className='mt-10 text-2xl text-white text-center underline underline-offest-2'
          to="/register">
            Not a member?
          </Link>

        </div>
      </div>
    )
}

export default LoginForm;