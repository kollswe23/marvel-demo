const express = require('express');
const app = express();

const https = require('https');
const body = require('body-parser');
const request = require('request');

app.use(express.static("public"));
app.use(body.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/signup", function(req, res) {

  //const jsondata = JSON.stringify(data);
  const url = new URL('https://gateway.marvel.com/v1/public/creators/13970?ts=1&hash=63989cc56df36ffe08d5f6ef5d5642bd&apikey=61913fe9ae4f2b765acd54765dee33e1');
  var options = {
          method : 'GET'
      }

      //making the https get call
      var getReq = https.request(url, options, function(resp) {
          let finalbody="";
          //console.log("\nstatus code: ", resp.statusCode);
          resp.on('data', function(data) {
            finalbody += data.toString();

          });
          resp.on('end', function(data){
            const jsonS = JSON.parse(finalbody);
            console.log(jsonS.data.results[0].id);
          })
      });

      //end the request
      getReq.end();
      getReq.on('error', function(err){
          console.log("Error: ", err);
      });
      res.sendFile(__dirname+"/success.html");
  })

app.listen(process.env.PORT || 3000,function(){
  console.log("Server started...");
});
//61913fe9ae4f2b765acd54765dee33e1
