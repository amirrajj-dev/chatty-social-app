import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.route.js'
import { connectToDb } from './utils/db.js'

const app = express()
dotenv.config()


app.use('/api/auth' , authRoutes)

app.listen(process.env.PORT , ()=>{
    connectToDb()
    console.log(`Server is running on port ${process.env.PORT} 🤖⚡`)
})