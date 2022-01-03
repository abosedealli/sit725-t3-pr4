let express = require("express");
let cors = require("cors");
let dbo = require("./database/db");

let app = express();

//var app = require('express')();
let http = require("http").createServer(app);
let io = require('socket.io')(http);


let projectRouter = require("./routes/projects");
let studentRouter = require("./routes/students");
//const bodyParser = require ('body-parser');

var port = process.env.PORT || 5050;

app.use(express.static(__dirname + "/public"));
app.use(express.json({limit: '50mb'}));
app.use(cors());

app.use('/api/projects',projectRouter);
app.use('/api/students',studentRouter);

app.get("/addNumber/:n1/:n2", function (request, response) {
  let n1 = parseInt(request.params.n1);
  let n2 = parseInt(request.params.n2);
  let result = n1 + n2 || null;
  if (result == null) {
      response.status(400).json({ statusCode: 400, err:'let inputs be numeric'})
  }
  response.json({ statusCode: 200, result: result });
});
dbo.connectToDatabase(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  http.listen(port, () => {
    console.log("Listening on port ", port);
  });
});

//this is only needed for Cloud foundry
require("cf-deployment-tracker-client").track();
