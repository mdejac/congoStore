import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate();
    // const [errors, setErrors] = useState([]);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/login', user, { withCredentials: true })
            .then(res => {
                console.log(res, "this works");
                navigate("/products")
            })
            .catch(err => console.log(err, "Not working"))
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <h3 >Login</h3>
                <div>
                    <div>
                        <label>Email</label>
                        <br />
                        <input type="email" value={user.email} name="email" onChange={changeHandler} />
                    </div>
                    <div >
                        <label>Password</label>
                        <br />
                        <input type="password" value={user.password} name="password" onChange={changeHandler} />
                    </div>
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login