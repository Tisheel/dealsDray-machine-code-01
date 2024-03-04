import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CreateEmployee = () => {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const createEmployee = async (e) => {

        e.preventDefault()

        setData(null)
        setError(null)
        setLoading(true)

        try {

            const { data } = await axios.post('http://127.0.0.1:3001/admin/createEmployee', {
                f_Name: e.target.f_Name.value,
                f_Email: e.target.f_Email.value,
                f_Mobile: e.target.f_Mobile.value,
                f_Designation: e.target.f_Designation.value,
                f_gender: e.target.f_gender.value,
                f_Course: e.target.f_Course.value,
            },
                {

                    headers: {
                        token: localStorage.getItem('token')
                    }
                }
            )

            setData(data)

            alert('Successfull Created')
            navigate('/')

        } catch (error) {

            alert(error.response.data?.message || error.message)
            setError(error)

        } finally {

            setLoading(false)

        }
    }

    useEffect(() => {

        if (!localStorage.getItem('admin')) {

            navigate('/login')
            return

        }

    }, [])

    return (
        <div>
            <Header />
            <div className='p-5'>
                <span className='text-2xl font-extrabold'>#Create Employee</span>
                <div className='flex justify-center items-center'>
                    <form className='flex flex-col gap-2 w-96 shadow-md p-5 mt-5 border-2' onSubmit={createEmployee}>
                        <label className='font-bold'>Name</label>
                        <input className='border-2 p-2 outline-none' type='text' name='f_Name' required />
                        <label className='font-bold'>Email</label>
                        <input className='border-2 p-2 outline-none' type='email' name='f_Email' required />
                        <label className='font-bold'>Mobile</label>
                        <input className='border-2 p-2 outline-none' type='mobile' name='f_Mobile' required />
                        <label className='font-bold'>Designation</label>
                        <select name='f_Designation' className='border-2 outline-none p-2' required>
                            <option value='HR'>HR</option>
                            <option value='Manager'>Manager</option>
                            <option value='Sales'>Sales</option>
                        </select>
                        <label className='font-bold'>Gender</label>
                        <div className='flex gap-5'>
                            <div className='flex items-center'>
                                <label>Male</label>
                                <input type='radio' name='f_gender' value='M' required />
                            </div>
                            <div className='flex items-center'>
                                <label>Female</label>
                                <input type='radio' name='f_gender' value='F' required />
                            </div>
                        </div>
                        <label className='font-bold'>Course</label>
                        <select name='f_Course' className='border-2 outline-none p-2' required>
                            <option value='MCA'>MCA</option>
                            <option value='BSC'>BSC</option>
                            <option value='BCA'>BCA</option>
                        </select>
                        <button className='bg-black text-white p-2 mt-5'>
                            {
                                loading ? 'Loading...' : 'Submit'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateEmployee