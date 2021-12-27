const express = Require("express");
const router = express.Router();

let controller = require("../controller/projectsControl");


router.get('/', (require, response) => {
    controller.getAllProjects(response);
});


router.get('/:id', (require, response) => {
    controller.getProjectByID(require.params.id, response);
});


router.post('/', (require, response) => {
    controller.insertProject(require.body, response);
});

router.put('/:id', (require, response) => {
    //require.body
    response.send("Hello from project update " + require.params.id + " resources API ");
});

router.delete('/:id', (require, response) => {
    controller.deleteProject(require.params.id, response);
});

module.exports = router;