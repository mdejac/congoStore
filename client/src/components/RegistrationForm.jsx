import React, { useState } from 'react';
import axios from 'axios'

function RegistrationForm() {
    //How to save this for use everwhere
    const [user, setUser] = useState({});

    const [registrationErrors, setRegistrationErrors] = useState([]);

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
        <h1>Register Form</h1>
        <form onSubmit={handleRegisterSubmit}>
            <div>
                <label>First Name:</label>
                {registrationErrors['first_name'] && (
                <p style={{ color: 'red' }}>{registrationErrors['first_name']}</p>
                )}
                <input type="text" value={registerInfo.first_name} onChange={(e) => setRegisterInfo({...registerInfo, first_name: e.target.value})} />
            </div>
            <div>
                <label>Last Name:</label>
                {registrationErrors['last_name'] && (
                <p style={{ color: 'red' }}>{registrationErrors['last_name']}</p>
                )}
                <input type="text" value={registerInfo.last_name} onChange={(e) => setRegisterInfo({...registerInfo, last_name: e.target.value})} />
           </div>
            <div>
                <label>Address:</label>
                {registrationErrors['address'] && (
                <p style={{ color: 'red' }}>{registrationErrors['address']}</p>
                )}
                <input type="text" value={registerInfo.address} onChange={(e) => setRegisterInfo({...registerInfo, address: e.target.value})} />
           </div>
           <div>
                <label>Email:</label>
                {registrationErrors['email'] && (
                <p style={{ color: 'red' }}>{registrationErrors['email']}</p>
                )}
                <input type="email" value={registerInfo.email} onChange={(e) => setRegisterInfo({...registerInfo, email: e.target.value})} />
           </div>
            <div>
                <label>Password:</label>
                {registrationErrors['password'] && (
                <p style={{ color: 'red' }}>{registrationErrors['password']}</p>
                )}
                <input type="password" value={registerInfo.password} onChange={(e) => setRegisterInfo({...registerInfo, password: e.target.value})} />
            </div>
            <div>
                <label>Confirm Password:</label>
                {registrationErrors['password'] && (
                <p style={{ color: 'red' }}>{registrationErrors['password']}</p>
                )}
                <input type="password" value={registerInfo.confirm_password} onChange={(e) => setRegisterInfo({...registerInfo, confirm_password: e.target.value})} />
            </div>
            <button type="submit">Register</button>
        </form>
      </div>
    )
}

export default RegistrationForm;
