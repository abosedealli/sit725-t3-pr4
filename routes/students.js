const express = require("express");
const router = express.Router();

router.get('/', (req,res) =>{
    res.send("Hello from  ");
});

router.get('/:id', (req,res) =>{
    res.send("Hello from  " + req.params.id);
});

router.post('/', (req, res) => {
    res.sendStatus(204);
})

router.put('/:id', (req, res) => {
    res.send("Hello from " + req.params.id);
})

router.delete('/:id', (req, res) => {
    res.send("Hello from " + req.params.id);
})

module.exports = router;