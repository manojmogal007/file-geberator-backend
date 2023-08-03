
const cors=require('cors')
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const Excel = require('exceljs');
const fs =require('fs')
const port=6060
const {userRouter}=require('./routes/fileroutes')

app.use(express.json())
app.use(cors())
app.use('/user',userRouter)


app.listen(port,()=>{
  mongoose.connect('mongodb+srv://manojmogal:manojmogal@cluster0.ryufaie.mongodb.net/?retryWrites=true&w=majority')
  .then(()=>console.log('Server connected to database'))
  .catch((err)=>{
    console.log(err)
    console.log('Connection fault')
  })
  console.log(`Server running on port ${port}`)
})