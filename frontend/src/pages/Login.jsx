import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const login = async (e) => {

        e.preventDefault()

        setData(null)
        setError(null)
        setLoading(true)

        try {

            const { data } = await axios.post('http://127.0.0.1:3001/admin/login', {
                f_userName: e.target.f_userName.value,
                f_Pwd: e.target.f_Pwd.value
            })

            setData(data)
            localStorage.setItem('token', data?.token)
            localStorage.setItem('admin', data?.f_userName)
            navigate('/')

        } catch (error) {

            alert(error.response.data?.message || error.message)
            setError(error)

        } finally {

            setLoading(false)

        }

    }

    useEffect(() => {

        if (localStorage.getItem('admin')) {

            navigate('/')

        }

    }, [])

    return (
        <div className='flex h-screen justify-center items-center'>
            <form className='flex flex-col border-2 p-5 rounded-md shadow-md' onSubmit={login}>
                <span className='text-2xl font-extrabold'>Admin Login</span>
                <div className='flex flex-col my-2'>
                    <label>Username</label>
                    <input className='border-2 p-2 outline-none' type='text' name='f_userName' placeholder='Username' required />
                </div>
                <div className='flex flex-col my-2'>
                    <label>Password</label>
                    <input className='border-2 p-2 outline-none' type='password' name='f_Pwd' placeholder='Password' required />
                </div>
                <button className='bg-black text-white p-2 rounded-md font-bold my-2'>
                    {
                        loading ? 'Loading...' : 'Login'
                    }
                </button>
            </form>
        </div>
    )
}

export default Login