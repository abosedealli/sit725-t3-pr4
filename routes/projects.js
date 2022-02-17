const express = require("express");
const router = express.Router();

const projectController= require("../controller/projectsControl");


router.get('/', (request, response) => {
    projectController.getProjects(response);
});


router.get('/:id', (request, response) => {
    projectController.getProjectByID(request.params.id,response);
});


router.post('/', (request, response) => {
    projectController.insertProject(request.body, response);
});

router.put('/:id', (request, response) => {
    //request.body
    response.sendStatus(204);
   
});

router.delete('/:id', (request, response) => {
    projectController.deleteProject(request.params.id,response);
})

module.exports = router;