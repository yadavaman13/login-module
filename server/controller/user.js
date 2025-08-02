const user = require("../models/user");
const userCollection = require("../models/user");

const homepageController = (req,res)=>{
    res.send("Hello Home Page!")
};

//Data Insert
const userDataController = async(req,res) => {
    console.log(req.body);
    const{UserName,UserPassword} = req.body;

    const record = new userCollection({
      user: UserName,
      pass: UserPassword,
    })

    await record.save();
    res.status(200).json({message: "Login Successfull...", data: UserName});
};

//Data Read and send
const userAllDataController = async (req, res) => {
   const userData = await userCollection.find();
   res.status(200).json({message: "userAllData", Data: userData})
};

module.exports = {
    homepageController,
    userDataController,
    userAllDataController,
};