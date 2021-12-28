let express = require("express");
let cors = require("cors");
let dbo = require("./database/db");

let app = express();

//var app = require('express')();
let http = require("http").createServer(app);
let io = require('socket.io')(http);

let projectRoute = require("./routes/projects");
let studentRoute = require("./routes/students");
//const bodyParser = require ('body-parser');

var port = process.env.PORT || 5050;

app.use(express.static(__dirname + "/public"));
app.use(express.json({limit: '50mb'}));
app.use(cors());

app.use('/api/projects',projectRoute);
app.use('/api/students',studentRoute);

/*app.get("/test", function (request, response) {
  var user_name = request.query.user_name;
  response.end("Hello " + user_name + "!");
});

let id = 1;

const projects = [];
for (let id = 1; id < 11; id++) {
  projects.push({
    projectID: id,
    title: "cyberproject " + id,
    info: `This is the project number ${id} we are creating here`,
    img: null,
  });
}

/*app.get("/projects", function (request, response) {
  dbo.get()
  response.json(projects);
});

app.post("/projects", function (request, response) {
  const project = request.body;
  console.log(project);
  if (project && project.id) {
    projects.push(project);
    response.sendStatus(204);
  } else {
     response.sendStatus(501);
  }
  
});*/

//socket test
/*io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  setInterval(() => {
    socket.emit("number", parseInt(Math.random() * 10));
  }, 1000);
});
*/
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
