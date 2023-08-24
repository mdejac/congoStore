import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = (user, setUser) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/register', userInfo, { withCredentials: true })
            .then(res => {
                console.log(res)
                // navigate("/products")
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <h3>Register</h3>
                <div >
                    <div>
                        <label>First name</label>
                        <br />
                        <input type="text" value={user.firstName} name="firstName" onChange={changeHandler} />
                    </div>
                    <div>
                        <label>Last name</label>
                        <br />
                        <input type="text" value={user.lastName} name="lastName" onChange={changeHandler} />
                    </div>
                    <div>
                        <label>Address</label>
                        <br />
                        <input type="text" value={user.address} name="address" onChange={changeHandler} />
                    </div>
                    <div>
                        <label>Email</label>
                        <br />
                        <input type="email" value={user.email} name="email" onChange={changeHandler} />
                    </div>
                    <div>
                        <label>Password</label>
                        <br />
                        <input type="password" value={user.password} name="password" onChange={changeHandler} />
                    </div>
                    <div>
                        <label>Confirm password</label>
                        <br />
                        <input type="password" value={user.confirmPassword} name="confirmPassword" onChange={changeHandler} />
                    </div>
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form >
        </div >
    )
}

export default Register