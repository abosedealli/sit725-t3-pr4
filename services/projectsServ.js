let dbo = require("../database/db");


    let projectCollection;
    setTimeout(()=> {
        projectCollection=dbo.getDb().collection('projects');}
    ,2000);
    

    const getAllProjects = (response)=>{
    projectCollection.find().toArray((err, result) => { if (err)throw err;
response.send(result);        
    });
}

const getProjectByID = (id, response)=>{
    console.log(id);
    projectCollection.find({projectID: id}).toArray((err, result) => { if (err)throw err;
response.send(result);        
    });

const insertProject=(project,response, io)=>{
    projectCollection.insertOne(project, (err, result) => { if (err)throw err;
        //transmitting message as new user is inserted
        io.emit("project:update", project);      
        response.send({result:204}); 
    });
}
const deleteProject = (id,response) => {
    
    projectCollection.deleteOne({ projectID: id }, (err, result) => {
    if (err) throw err;
    response.send({ result: 204 });
    });
}

module.exports= { getAllProjects, getProjectByID, insertProject, deleteProject 
}
