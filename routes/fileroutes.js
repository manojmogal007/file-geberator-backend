
const express=require('express')
const {createuser,getusers}=require('../controllers/sheets')

const userRouter=express.Router()

userRouter.route('/createuser').post(createuser)
userRouter.route('/getuser').get(getusers)




module.exports={userRouter}