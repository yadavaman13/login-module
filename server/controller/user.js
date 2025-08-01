const user = require("../models/user");
const userCollection = require("../models/user");

const homepageController = (req,res)=>{
    res.send("Hello Home Page!")
};

const userDataController = async(req,res) => {
    console.log(req.body);
    const{UserName,UserPassword} = req.body;

    const record = new userCollection({
      user: UserName,
      pass: UserPassword,
    })

    await record.save();
    res.json("Login Succesfull!")
};

module.exports = {
    homepageController,
    userDataController,
};