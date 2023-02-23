const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const https = require('node:https');
const { urlToHttpOptions } = require("node:url");
app.use(bodyparser.urlencoded({ extended: true }));
app.get("/", function (res, res) {
  res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res){
    const fname=req.body.fname
    const lname=req.body.lname
    const email=req.body.email
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }
            }
        ]
    };
    const jsondata=JSON.stringify(data);
    const url="https://us12.api.mailchimp.com/3.0/lists/1c788d0bb2"
    const options={
        method:"POST",
        auth:"Raghav:4cdef3dbf21ee1ee800d61439ef9bc10-us12"
    }
   const request= https.request(url,options,function(response){
      if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html")
      }else{
        res.send("Failed")
      }
          response.on("data",function(data){
            console.log(JSON.parse(data));
          })
    }) 
    request.write(jsondata);
    request.end();
})
app.post("/failure",function(req,res){
  res.redirect("/")
})
app.listen(process.env.PORT||3000, function () {
  console.log("Running");
});
// 
// 4cdef3dbf21ee1ee800d61439ef9bc10-us12
// list id
// 1c788d0bb2