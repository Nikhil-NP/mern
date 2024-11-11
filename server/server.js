import express from "express";
import cors from "cors";//cross origin resuruce sharing ,enables communication across differnet ports/url 
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050; //we either use the port by the enviroment or standard 5050 port 

const app = express(); 


app.use(cors());//making my app to accept from differnt ports
app.use(express.json());//pareses the incoming json avilable in req.body
app.use("/record",records);


//starting the server(express)
app.listen(PORT,() => {
    console.log(`server is listening at ${PORT}`);
    
});