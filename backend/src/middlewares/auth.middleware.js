import { usersModel } from "../models/user.model.js"
import jwt from 'jsonwebtoken'

export const protectRoute = async (req, res, next) =>{
    try {
        const token = req.cookies.chattyToken
        if (!token) {
            return res.status(403).json({message : 'Token Not Found' , success  : false})
        }
        //decode token and find user
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        const user = await usersModel.findOne({email : payload.email})
        if (!user) {
            return res.status(403).json({message : 'User Not Found' , success  : false})
        }
        req.user = user
        next()
    } catch (error) {
        return res.status(500).json({message : "error in protected route" , error , success : false})
    }
}