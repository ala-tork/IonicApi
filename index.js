const express = require('express');
const app =express()
app.use(express.json());
require('./Config/connect');

const userRoute = require("./Routes/User");
const productRoute = require("./Routes/Product");

app.use("/user",userRoute);
app.use("/Product",productRoute);

app.listen(5000,()=>{
    console.log(`The server is working on port 5000`);
})