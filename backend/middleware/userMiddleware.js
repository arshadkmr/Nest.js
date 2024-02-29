import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'
import dotenv from 'dotenv'
dotenv.config()

const userAuthenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401).json({ message: 'No Token Found' })
        const token = authHeader.split(' ')[1]
        if (token == null) return res.status(401).json({ message: 'No Token Found' })
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userData = await User.findOne({ _id: decodedToken.id })
        if (userData) {
            req.user = userData
            next()
        } else {
            res.status(401).json({
                message: 'Invalid token'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}

export default userAuthenticateToken