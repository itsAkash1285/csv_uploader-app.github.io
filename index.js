//using express as a server
const express = require('express');   
const port = process.env.PORT || 7001;
const path = require('path');
const fs = require('fs');
//initializing express
const app = express();         
//setting up view engine as ejs
app.set('view engine','ejs');  
//setting path of views folder
app.set('views',path.join(__dirname,'views'));   
//using parser to read form data
app.use(express.urlencoded({extended: true}));  
//accesing static files from assets folder
app.use(express.static('assets'));    

//accesing uploaded files from uploads folder 
app.use('/uploads',express.static(__dirname+'/uploads'));   

 //using index file of routes for all the routes
app.use('/',require('./routes/index'));   

app.listen(port,function(err){
    if(err){
        console.log("Error in running express server",err);
        return;
    }
    // deletes the uploaded csv files everytime server restarts
    try { var files = fs.readdirSync(path.join(__dirname,'/uploads')); }
    catch(e) { return; }
    if (files.length > 0)
      for (let i = 0; i < files.length; i++) {
        var filePath = path.join(__dirname,'/uploads',files[i]);
        if (fs.statSync(filePath).isFile())
          fs.unlinkSync(filePath);
      }
    console.log("Server is up and running on port",port);
});