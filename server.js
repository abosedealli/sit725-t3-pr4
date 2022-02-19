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

app.use((req, res, next)=> {
    req.io  = io;
    return next();
});

app.use('/api/projects',projectRoute);
app.use('/api/students',studentRoute);

app.get("/add/:n1/:n2", function (request, response) {
  
  const a =parseInt(request.params.n1);
  const b = parseInt(request.params.n2);
  const result = a + b || null;
    console.log(result);
    if (result == null) {
    response.status(400).json({error:'input is wrong, two number expected'});
    } else 
    {response.json({ result: result });}
  });

/*let id = 1;

const projects = [];
for (let id = 1; id < 11; id++) {
  projects.push({
    projectID: id,
    title: "cyberproject " + id,
    info: `This is the project number ${id} we are creating here`,
    img: null,
  });
}
*/
// app.get("/projects", function (request, response) {
//   const projects = dbo.getDb();
//   response.json(projects);
// });

// app.post("/projects", function (request, response) {
//   const project = request.body;
//   console.log(project);
//   if (project && project.id) {
//     projects.push(project);
//     response.sendStatus(204);
//   } else {
//      response.sendStatus(501);
//   }
  
// });

const onConnection = (socket) => { 
  socket.on("chat:msg", (msg) => {
      socket.broadcast.emit("chat:brodcast",msg);
      console.log(msg);
  })
  console.log("a new user is connected");
}
io.on("connection", onConnection);

dbo.connectToDatabase(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  http.listen(port, () => {
    console.log("Listening on port ", port);
  });
});

require("cf-deployment-tracker-client").track();
