const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/domain-result');

const db=mongoose.connection;
db.on('error',console.error.bind(console,"Error connecting to mongodb"));

db.once('open',function(){
    console.log("connected to the database");
})

module.exports=db;
           