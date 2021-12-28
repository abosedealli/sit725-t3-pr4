let express = require("express");
let router = express.Router();

let controller = require("../controller/projectsControl");


router.get('/', (request, response) => {
    controller.getProjects(response);
});


router.get('/:id', (request, response) => {
    response.send(Hello);
});


router.post('/', (request, response) => {
    controller.insertProject(request.body, response);
});

router.put('/:id', (request, response) => {
    //request.body
    response.sendStatus(204);
   
});

router.delete('/:id', (request, response) => {
    controller.deleteProject(request.params.id,response);
})

module.exports = router;