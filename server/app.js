const express = require("express");
const cors = require("cors");
const app = express();
const apiRouter = require("./routes/api");
const mongoose = require("mongoose");

// Enable CORS for all routes
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Add your frontend URLs
    credentials: true
}));

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