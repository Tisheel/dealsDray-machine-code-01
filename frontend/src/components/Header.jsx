import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('admin')
        navigate('/login')
    }

    return (
        <div className='flex shadow-md p-5 justify-between items-center text-xl'>
            <Link to='/'>
                <span>LOGO</span>
            </Link>
            <button className='text-red-600 font-bold' onClick={() => logout()}>logout</button>
        </div>
    )
}

export default Header