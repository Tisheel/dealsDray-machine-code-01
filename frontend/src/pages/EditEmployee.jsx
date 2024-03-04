import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditEmployee = () => {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const { employeeId } = useParams()

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const getEmployee = async () => {

        setError(null)
        setLoading(true)

        try {

            const { data } = await axios.get('http://127.0.0.1:3001/admin/employee/' + employeeId, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })

            setData(data[0])

        } catch (error) {

            alert(error.response.data?.message || error.message)
            setError(error)

        } finally {

            setLoading(false)

        }

    }

    const updateEmployee = async (e) => {

        e.preventDefault()

        setError(null)
        setLoading(true)

        try {

            await axios.patch('http://127.0.0.1:3001/admin/updateEmployee/' + employeeId, {
                f_Name: e.target.f_Name.value,
                f_Email: e.target.f_Email.value,
                f_Mobile: e.target.f_Mobile.value,
                f_Designation: e.target.f_Designation.value,
                f_gender: e.target.f_gender.value,
                f_Course: e.target.f_Course.value,
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })

            alert('Successfull Updated')
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

        getEmployee()

    }, [])

    return (
        <div>
            <Header />
            <div className='p-5'>
                <span className='text-2xl font-extrabold'>#Update Employee</span>
                <div className='flex justify-center items-center'>
                    {
                        data && <form className='flex flex-col gap-2 w-96 shadow-md p-5 mt-5 border-2' onSubmit={updateEmployee}>
                            <label className='font-bold'>Name</label>
                            <input className='border-2 p-2 outline-none' defaultValue={data?.f_Name} type='text' name='f_Name' onChange={handleChange} />
                            <label className='font-bold'>Email</label>
                            <input className='border-2 p-2 outline-none' defaultValue={data?.f_Email} type='email' name='f_Email' onChange={handleChange} />
                            <label className='font-bold'>Mobile</label>
                            <input className='border-2 p-2 outline-none' defaultValue={data?.f_Mobile} type='mobile' name='f_Mobile' onChange={handleChange} />
                            <label className='font-bold'>Designation</label>
                            <select name='f_Designation' className='border-2 outline-none p-2' onChange={handleChange}>
                                <option defaultValue={data?.f_Designation === 'HR'} value='HR'>HR</option>
                                <option defaultValue={data?.f_Designation === 'Manager'} value='Manager'>Manager</option>
                                <option defaultValue={data?.f_Designation === 'Sales'} value='Sales'>Sales</option>
                            </select>
                            <label className='font-bold'>Gender</label>
                            <div className='flex gap-5'>
                                <div className='flex items-center'>
                                    <label>Male</label>
                                    <input checked={data?.f_gender === 'M'} type='radio' name='f_gender' value='M' onChange={handleChange} />
                                </div>
                                <div className='flex items-center'>
                                    <label>Female</label>
                                    <input checked={data?.f_gender === 'F'} type='radio' name='f_gender' value='F' onChange={handleChange} />
                                </div>
                            </div>
                            <label className='font-bold'>Course</label>
                            <select name='f_Course' className='border-2 outline-none p-2' onChange={handleChange}>
                                <option defaultValue={data?.f_Course === 'MCA'} value='MCA'>MCA</option>
                                <option defaultValue={data?.f_Course === 'BSC'} value='BSC'>BSC</option>
                                <option defaultValue={data?.f_Course === 'BCA'} value='BCA'>BCA</option>
                            </select>
                            <button className='bg-black text-white p-2 mt-5'>
                                {
                                    loading ? 'Loading...' : 'Submit'
                                }
                            </button>
                        </form>
                    }
                    {
                        (loading && !data) && <span>Loading...</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default EditEmployee