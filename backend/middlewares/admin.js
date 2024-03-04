import client from "../db/connection.js"
import jwt from 'jsonwebtoken'

const admin = async (req, res, next) => {

    try {

        const token = req.headers?.token

        if (!token) {

            return res.status(400).json({
                message: 'No token.'
            })

        }

        const [rows, fields] = await client.query('SELECT f_userName FROM t_Login')

        const { f_userName } = jwt.verify(token, process.env.JWT_SECRET)

        if (f_userName === rows[0]?.f_userName) {

            next()

        } else {

            res.status(401).json({
                message: 'Unauthorized'
            })

        }

    } catch (error) {

        if (error instanceof jwt.JsonWebTokenError) {

            return res.status(400).json({
                message: error.message
            })

        }

        console.log(error)
        res.status(500).json({
            message: 'Somthing went wrong'
        })

    }

}

export default admin