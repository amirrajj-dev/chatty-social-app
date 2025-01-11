import bcrypt from 'bcryptjs'
import { usersModel } from '../models/user.model.js'
import jwt from 'jsonwebtoken'

const emailReg = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
export const signup = async (req , res)=>{
    try {
        const {email , password , fullname , gender} = req.body

        const isUserExist = await usersModel.findOne({email: email})
        if(isUserExist){
            return res.status(400).json({message: 'You Already Signed Up' , success : false})
        }

        if (!email || !password || !fullname || !gender){
            return res.status(400).json({message : "Please fill all the fields" , success : false})
        }

        if (!emailReg.test(email)){
            return res.status(400).json({message : "Invalid email" , success : false})
        }
        if (password.length < 6){
            return res.status(400).json({message : "Password must be at least 6 characters" , success : false})
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password , 10)
        //handle automaticalyy profile pic base on gender in future

        const user = await usersModel.create({email , password : hashedPassword , fullname , gender})
        // jwt 
        const token = await jwt.sign({email : user.email} , process.env.SECRET_KEY , {
            expiresIn : '7d'
        })
        
        //setting token in cookie
        res.cookie('chatty-token' , token , {
            httpOnly : true ,
            maxAge : 7 * 24 * 60 * 60 * 1000 , // 7 days
            path : '/',
            secure : process.env.NODE_ENV !== 'development', // only works on https
            sameSite : 'strict'
        })


        //deleting password field from user
        user.password = null
        res.status(201).json({message : "User created successfully" , success : true , data : user})

    } catch (error) {
        return res.status(500).json({message : 'Error Signing Up User' , error , success : false})
    }
}

export const login = (req , res)=>{

}

export const logout = (req , res)=>{

}
