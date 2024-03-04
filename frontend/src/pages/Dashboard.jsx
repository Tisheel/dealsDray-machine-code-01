import React, { useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [search, setSearch] = useState('')

    const navigate = useNavigate()

    const deleteEmployee = async (employeeId) => {

        setError(null)
        setLoading(true)

        try {

            const { data } = await axios.delete('http://127.0.0.1:3001/admin/deleteEmployee/' + employeeId,
                {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                }
            )

            alert('Deleted Successfully')
            fetchFilterEmployee()

        } catch (error) {

            alert(error.response.data?.message || error.message)
            setError(error)

        } finally {

            setLoading(false)

        }

    }

    const fetchFilterEmployee = async () => {

        setError(null)
        setLoading(true)
        setData(null)

        try {

            const { data } = await axios.post('http://127.0.0.1:3001/admin/filterEmployee', {
                search
            },
                {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                }
            )

            setData(data)

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

        fetchFilterEmployee()

    }, [])

    useEffect(() => {

        const getData = setTimeout(fetchFilterEmployee, 2000)

        return () => clearTimeout(getData)

    }, [search])

    return (
        <div>
            <Header />
            <div className='p-5'>
                <div className='flex items-center justify-between'>
                    <span className='text-2xl font-extrabold'>#Employee Table</span>
                    <input className='border-2 outline-none p-2' value={search} placeholder='search' type='text' onChange={(e) => setSearch(e.target.value)} />
                    <Link to='/createEmployee'>
                        <span className='text-lg underline cursor-pointer'>Create Employee</span>
                    </Link>
                </div>
                <table className='w-full text-lg mt-5'>
                    <thead>
                        <tr>
                            <th className='p-2 border-2'>f_Id</th>
                            <th className='p-2 border-2'>f_Image</th>
                            <th className='p-2 border-2'>f_Name</th>
                            <th className='p-2 border-2'>f_Email</th>
                            <th className='p-2 border-2'>f_Mobile</th>
                            <th className='p-2 border-2'>f_Designation</th>
                            <th className='p-2 border-2'>f_gender</th>
                            <th className='p-2 border-2'>f_Course</th>
                            <th className='p-2 border-2'>f_Createdate</th>
                            <th className='p-2 border-2'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((item) => {
                                return <tr key={item.f_Id}>
                                    <td className='p-2 border-2'>{item.f_Id}</td>
                                    <td className='p-2 border-2'>{item.f_Image}</td>
                                    <td className='p-2 border-2'>{item.f_Name}</td>
                                    <td className='p-2 border-2'>{item.f_Email}</td>
                                    <td className='p-2 border-2'>{item.f_Mobile}</td>
                                    <td className='p-2 border-2'>{item.f_Designation}</td>
                                    <td className='p-2 border-2'>{item.f_gender}</td>
                                    <td className='p-2 border-2'>{item.f_Course}</td>
                                    <td className='p-2 border-2'>{new Date(item.f_Createdate).toLocaleDateString()}</td>
                                    <td className='p-2 border-2'>
                                        <div className='flex justify-between'>
                                            <button className='bg-yellow-500 text-white p-1 rounded-md' onClick={() => navigate('/updateEmployee/' + item.f_Id)}>Edit</button>
                                            <button className='bg-red-500 text-white p-1 rounded-md' onClick={() => deleteEmployee(item.f_Id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            })
                        }
                        {
                            (loading && !data) && <span>Loading...</span>
                        }
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default Dashboard