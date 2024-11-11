
import { MongoClient,ServerApiVersion } from "mongodb";//mongo clint for crud , serverapiv for api versoning(optional)

//this has mongodb connections string establishing connection
const uri = process.env.ATLAS_URI || "";

const client = new MongoClient(uri,{//new instance
    serverApi :{
        version :ServerApiVersion.v1,//api version
        strict:true,
        deprecationErrors:true,
    },
});

try{
    await client.connect(); //since connect is asynscronous we need to make it wait using "await"
    //send ping to confirm sucessfull connection
    await client.db("admin").command({ping :1});//it will send a ping command and confirm if sucessfull by console.log
    console.log(
        "pinged the devlopment,succesfully connected the mongodb"
    );


}
catch(err){
    console.log(err);
}

let db = client.db("employees");//the employee db we will access and interact with it/if doesnt exist we will create 

export default db;//export allows to use this in the app for crud operation
//its default/primary export as its the only thing exported and its name can be changed in differnt part of the code 