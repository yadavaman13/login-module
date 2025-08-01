const express = require("express");
const app = express();
const apiRouter = require("./routes/api");
const mongoose = require("mongoose");

app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/merntest")
.then(()=>{
    console.log("Db connected");
}).catch((err)=>{
    console.log(err);
});


app.use("/api",apiRouter);
let PORT = 5000;
app.listen(PORT,() =>{
    console.log(`Running on Port ${PORT}`);
}); 