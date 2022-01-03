const express = require("express");
const router = express.Router();


router.get('/', (request, response) => {
    response.send("Hello");
});


router.get('/:id', (request, response) => {
    response.send("Hello" + req.params.id + " reousces API ");
});


router.post('/', (request, response) => {
    //req.body
    response.sendStatus(204);
});

router.put('/:id', (req, res) => {
    //req.body
    response.send("Hello from student update " + req.params.id + " reousces API ");
});

router.delete('/:id', (req, res) => {
    //req.body
    res.send("Hello from student delete " + req.params.id + " reousces API ");
});

module.exports = router;