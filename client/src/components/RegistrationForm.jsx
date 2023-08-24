import React, { useState } from 'react';
import axios from 'axios'
import LoginPic from "../assets/congo.png";
import { useNavigate } from 'react-router-dom';


function RegistrationForm() {
    //How to save this for use everwhere
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    const [registrationErrors, setRegistrationErrors] = useState([]);

    const FormStyles = `mb-5 rounded-lg bg-primary-300 px-5 py-3 placeholder-white`

    const initalRegistrationState = {
        first_name : "",
        last_name : "",
        address : "",
        email : "",
        password : "",
        confirm_password : ""
    }

    const [registerInfo, setRegisterInfo] = useState(initalRegistrationState)

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
    
        const data = {
            first_name: registerInfo.first_name,
            last_name: registerInfo.last_name,
            address:registerInfo.address,
            email: registerInfo.email,
            password: registerInfo.password,
            confirm_password: registerInfo.confirm_password
        };
        try {
          const response = await axios.post('http://127.0.0.1:5000/api/users/register', data);
          console.log('Response:', response.data);
          if (response.data.errors) {
            setRegistrationErrors(response.data.errors);
          } else {
            setRegistrationErrors({})
            setRegisterInfo(initalRegistrationState)
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
        <div className='md:flex justify-around items-center bg-secondary-100 rounded-lg p-10 mt-15'>
            <div>
                <img src={LoginPic} alt="congopic" 
                className='w-[750px] rounded-md'/>
            </div>

            <div>
                <h1 className='text-center text-2xl text-white'>
                    Join <span className='italic'>Congo</span>
                </h1>
                <h2 className='text-center text-xl text-white'>Register Here</h2>
                <form 
                className='bg-primary-500 p-10 rounded-lg'
                onSubmit={handleRegisterSubmit}>
                    <div>
                        {registrationErrors['first_name'] && (
                        <p style={{ color: 'red' }}>{registrationErrors['first_name']}</p>
                        )}
                        <input 
                        id='first name'
                        className={FormStyles}
                        placeholder='FIRST NAME'
                        type="text" 
                        value={registerInfo.first_name} 
                        onChange={(e) => setRegisterInfo({...registerInfo, first_name: e.target.value})} />
                    </div>
                    <div>
                        {registrationErrors['last_name'] && (
                        <p style={{ color: 'red' }}>{registrationErrors['last_name']}</p>
                        )}
                        <input 
                        id='last name'
                        className={FormStyles}
                        placeholder='LAST NAME'
                        type="text" 
                        value={registerInfo.last_name} 
                        onChange={(e) => setRegisterInfo({...registerInfo, last_name: e.target.value})} />
                </div>
                    <div>
                        {registrationErrors['address'] && (
                        <p style={{ color: 'red' }}>{registrationErrors['address']}</p>
                        )}
                        <input 
                        id='address'
                        className={FormStyles}
                        placeholder='ADDRESS'
                        type="text" 
                        value={registerInfo.address} 
                        onChange={(e) => setRegisterInfo({...registerInfo, address: e.target.value})} />
                </div>
                <div>
                        {registrationErrors['email'] && (
                        <p style={{ color: 'red' }}>{registrationErrors['email']}</p>
                        )}
                        <input 
                        id='email'
                        className={FormStyles}
                        placeholder='EMAIL'
                        type="email" 
                        value={registerInfo.email} 
                        onChange={(e) => setRegisterInfo({...registerInfo, email: e.target.value})} />
                </div>
                    <div>
                        {registrationErrors['password'] && (
                        <p style={{ color: 'red' }}>{registrationErrors['password']}</p>
                        )}
                        <input 
                        id='password'
                        className={FormStyles}
                        placeholder='PASSWORD'
                        type="password" 
                        value={registerInfo.password} 
                        onChange={(e) => setRegisterInfo({...registerInfo, password: e.target.value})} />
                    </div>
                    <div>
                        {registrationErrors['password'] && (
                        <p style={{ color: 'red' }}>{registrationErrors['password']}</p>
                        )}
                        <input 
                        id='confirm password'
                        className={FormStyles}
                        placeholder='CONFIRM PASSWORD'
                        type="password" 
                        value={registerInfo.confirm_password} 
                        onChange={(e) => setRegisterInfo({...registerInfo, confirm_password: e.target.value})} />
                    </div>
                    <button 
                    className='className="mt-5 rounded-lg bg-secondary-300 px-20 py-3 transition duration-500 hover:text-white'
                    type="submit">Register</button>
                </form>
            </div>
      </div>
    )
}

export default RegistrationForm;
