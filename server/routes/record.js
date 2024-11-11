
//here we will perform all the crud operations on db

import express, { query } from "express";

//conncect to the db
import db from "../db/connection.js";

//convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

//router helps to create paths to do the operations diff path diff operation
const router = express.Router();

//all the records
router.get("/", async(req,res) => {
    let collection = await db.collection("records"); //if record doesnt exist it will be created and called 
    let result = await collection.find({}).toArray();//getting aall the elemts from the collection

    res.send(result).status(200);


});

//get single elemt by id (the :id is  a parameter ),
router.get("/:id",async(req,res) =>{
    let collection = await db.collection("records");
    let query = {_id :new ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if(!result) res.send("not found").statusCode(404);
    else res.send(result).status(200);

});



//write one 
router.post("/",async(req,res) => {
    try{
        let newDocument = {
            name : req.body.name,
            position : req.body.position,
            level : req.body.level,

        };
        let collection = await db.collection("records");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Error adding record");

    }
});


//update one
router.patch("/:id",async (req,res) =>{
    try{
        const query ={ _id:new ObjectId(req.params.id) };
        const update = {
            $set:{
                name : req.body.name,
                position: req.body.position,
                level: req.body.level,

            },

        };
        let collection = await db.collection("records");
        let result = await collection.updateOne(query,update);
        res.send(result).status(200);
    }
     catch (err){
        console.log(err);
        res.status(500).send("error updating the data");

    }
});

//delete one 
router.delete("/:id",async (req,res) =>{
    try{
        const query = { _id : new ObjectId(req.params.id)};
        const collection = db.collection("records");
        let result = await collection.deleteOne(query);
        res.send(result).status(200);
    }
    catch(err){
        res.status(500).send("error deleting");

    }
});

export default router;