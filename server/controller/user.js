const user = require("../models/user");
const userCollection = require("../models/user");

const homepageController = (req,res)=>{
    res.send("Hello Home Page!")
};

//Data Insert Controller
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

//Data Read and send Controller
const userAllDataController = async (req, res) => {
   const userData = await userCollection.find();
   res.status(200).json({message: "userAllData", Data: userData})
};

//Data Delete Controller
const userDataDelete = async (req, res) => {
    try{
        const userId = req.params.abc;
        console.log("Deleting user with ID:", userId);
        
        const deletedUser = await userCollection.findByIdAndDelete(userId);
        
        if (!deletedUser) {
            return res.status(404).json({message: "User not found"});
        }
        
        res.status(200).json({message: "User deleted successfully", deletedUser});
    }
    catch(error){
        console.error("Delete error:", error);
        res.status(500).json({message: "Internal Server error", error: error.message});
    }
}

module.exports = {
    homepageController,
    userDataController,
    userAllDataController,
    userDataDelete,
};