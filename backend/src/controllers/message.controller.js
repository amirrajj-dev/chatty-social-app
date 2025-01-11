import { usersModel } from "../models/user.model.js"

export const getUsersForSideBar = async (req , res)=>{
    try {
        const currentUser = req.user

        //get everyuser except the current user
        const users = await usersModel.find({_id : {$ne : currentUser._id}}).select('-password')

        return res.status(200).json({mesage : 'users fetched successfully' , success : true , data : users})
    } catch (error) {
        return res.status(500).json({mesage : 'Error Fetching Users' , success : false})        
    }
}