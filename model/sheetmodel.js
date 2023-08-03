const mongoose=require('mongoose')

const formSchema=mongoose.Schema({
    name:String,
    email:String
},{
    versionKey:false
})

const Formmodel=mongoose.model('formdata',formSchema)

module.exports={Formmodel}