import express from 'express'
import dotenv from 'dotenv'
import client from './db/connection.js'
import cors from 'cors'
import { createEmployeeValidation, loginValidation, updateEmployeeValidation } from './validation/employee.js'
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import admin from './middlewares/admin.js'

dotenv.config()

const { PORT, HOST } = process.env

const init = () => {

    const app = express()

    // middlewares
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())

    app.post('/admin/login', async (req, res) => {

        try {

            const { f_userName, f_Pwd } = await loginValidation.validateAsync(req.body, { abortEarly: false })

            const [rows, fields] = await client.query('SELECT * FROM t_Login WHERE f_userName = ? AND f_Pwd = ?', [f_userName, f_Pwd])

            if (rows.length < 1) {

                return res.status(400).json({
                    message: `Invalid Credentials`
                })

            }

            const token = jwt.sign({ f_userName: rows[0].f_userName }, process.env.JWT_SECRET, { expiresIn: '1d' })

            res.status(200).json({ token, expiresIn: '1d', f_userName: rows[0].f_userName })

        } catch (error) {

            if (error instanceof Joi.ValidationError) {

                return res.status(400).json({
                    message: error.message
                })

            }

            console.log(error)
            res.status(500).json({
                message: 'Somthing went wrong'
            })

        }

    })

    app.post('/admin/createEmployee', admin, async (req, res) => {

        try {

            const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course
            } = await createEmployeeValidation.validateAsync(req.body, { abortEarly: false })

            const [result, fields] = await client.query('INSERT INTO t_Employee (f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course, f_Createdate) VALUES (?, ?, ?, ?, ?, ?, ?);', [f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course, new Date().toISOString().slice(0, 10)])

            res.status(200).json({
                message: 'ok'
            })

        } catch (error) {

            if (error instanceof Joi.ValidationError) {

                return res.status(400).json({
                    message: error.message
                })

            }


            if (error instanceof Error) {

                return res.status(400).json({
                    message: error.message
                })

            }

            console.log(error)
            res.status(500).json({
                message: 'Somthing went wrong'
            })

        }

    })

    app.get('/admin/employeeList', admin, async (req, res) => {

        try {

            const [rows, fields] = await client.query('SELECT * FROM t_Employee')


            if (rows.length < 1) {

                return res.status(404).json({
                    message: `Not Found`
                })

            }

            res.status(200).json(rows)

        } catch (error) {

            console.log(error)
            res.status(500).json({
                message: 'Somthing went wrong'
            })

        }

    })

    app.get('/admin/employee/:employeeId', admin, async (req, res) => {

        try {

            const [rows, fields] = await client.query('SELECT * FROM t_Employee WHERE f_Id = ?', [req.params?.employeeId])

            if (rows.length < 1) {

                return res.status(404).json({
                    message: `Not Found`
                })

            }

            res.status(200).json(rows)

        } catch (error) {

            console.log(error)
            res.status(500).json({
                message: 'Somthing went wrong'
            })

        }

    })

    app.post('/admin/filterEmployee', admin, async (req, res) => {

        try {

            const { search } = req.body

            const [rows, fields] = await client.query('SELECT * FROM t_Employee WHERE f_Name Like ? OR f_Email LIKE ? OR f_Mobile LIKE ?', ["%" + search + "%", "%" + search + "%", "%" + search + "%"])

            if (rows.length < 1) {

                return res.status(404).json({
                    message: `Not Found`
                })

            }

            res.status(200).json(rows)

        } catch (error) {

            console.log(error)
            res.status(500).json({
                message: 'Somthing went wrong'
            })

        }

    })

    app.patch('/admin/updateEmployee/:employeeId', admin, async (req, res) => {

        try {

            const { employeeId } = req.params

            if (!employeeId) {

                res.status(400).json({
                    message: 'Invalid employeeId'
                })

            }

            const data = await updateEmployeeValidation.validateAsync(req.body, { abortEarly: false })

            const [result, fields] = await client.query('UPDATE t_Employee SET ? WHERE f_Id = ?', [data, employeeId])

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: `No record found for employeeId ${employeeId}`
                })

            }

            res.status(200).json({
                message: 'ok'
            })

        } catch (error) {

            if (error instanceof Joi.ValidationError) {

                return res.status(400).json({
                    message: error.message
                })

            }


            if (error instanceof Error) {

                return res.status(400).json({
                    message: error.message
                })

            }

            console.log(error)
            res.status(500).json({
                message: 'Somthing went wrong'
            })

        }

    })

    app.delete('/admin/deleteEmployee/:employeeId', admin, async (req, res) => {

        try {

            const { employeeId } = req.params

            const [result, fields] = await client.query('DELETE FROM t_Employee WHERE f_Id = ?', [employeeId])

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: `No record found for employeeId ${employeeId}`
                })

            }

            res.status(200).json({
                message: 'ok'
            })

        } catch (error) {

            console.log(error)
            res.status(500).json({
                message: 'Somthing went wrong'
            })

        }

    })

    app.listen(PORT, () => {

        console.log(`http://${HOST}:${PORT}`)

    })

}

init()