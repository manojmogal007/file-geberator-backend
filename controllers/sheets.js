const {Formmodel}=require('../model/sheetmodel')
const json2xls = require('json2xls'); // Import the library for Excel generation
const path=require('path')
const fs = require('fs');

exports.createuser=async(req,res)=>{

    try{
      const new_user=new Formmodel(req.body)
      await new_user.save()
      res.status(200).json({'msg':'User created sucessfully'})
    }catch(err){
      console.log(err)
      res.status(400).json({'msg':'User not created'})
    }
}


exports.getusers=async(req,res)=>{

  const alluser=await Formmodel.find().lean()

  const sanitizedData = alluser.map((item) => {
    const { _id, ...rest } = item;
    return rest;
  });

  const xls = json2xls(sanitizedData);
  const directoryPath = path.resolve(process.cwd(), 'excel_files');
  const filePath = path.join(directoryPath, 'form_data.xlsx');

  // Create the directory if it doesn't exist
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
  // Write the Excel file to the server filesystem
  fs.writeFileSync(filePath, xls, 'binary');
  
  // Send the file to the client for download 
  res.download(filePath, 'form_data.xlsx', (err) => {
    if (err) {
      // Handle download error
      res.status(400).json({'msg':'User not fetched'})
    }
    // Delete the file from the server filesystem after download
    fs.unlinkSync(filePath);
  });
}