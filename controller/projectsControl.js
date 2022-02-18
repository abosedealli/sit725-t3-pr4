let service = require("../services/projectsServ");

const getProjects=(response)=>{
    service.getAllProjects(response);

}
const getProjectById=(id, response)=>{
    service.getProjectById(id, response);
}
const insertProject=(project, response)=>{
    service.insertProject(project, response); }

const deleteProject=(id, response)=>{
    service.deleteProject(id, response); } 
    
    
module.exports={ getProjects, insertProject, deleteProject, getProjectById }