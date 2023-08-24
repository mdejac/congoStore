import React from 'react'
import RegistrationForm from './RegistrationForm'
import LoginForm from './LoginForm'

const RegLog = (user, setUser) => {
    return (
        <div className='m-10 py-10 md:flex justify-around bg-secondary-100 rounded-lg'>
            <LoginForm user={user} setUser={setUser}/>
            <RegistrationForm user={user} setUser={setUser}/>
        </div>
    )
}

export default RegLog;