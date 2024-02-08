const sql=require('mysql');


const conn=sql.createConnection({
    host:"localhost",
    user:"root",
    password:"Komal@2610",
    database:"facebook"
})

conn.connect((error)=>{
    if(error)
    {
        console.log("error connecting to database");
    }
    else
    {
        console.log("succesfully connected to database")
    }
});
module.exports=conn;
