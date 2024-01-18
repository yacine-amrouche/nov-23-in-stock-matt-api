const express = require("express");
const cors = require("cors");
const router = express();





router.get("/", (req, res) =>{
    res.status(200)
});
router.get("/warehouse", (req, res) =>{
    res.status(200)
});
router.get("/inventory", (req, res) =>{
    res.status(200)
});

router.get("/warehouse/:id", (req, res) =>{
    res.status(200);
});

router.get("/inventory/:id", (req, res) =>{
    res.status(200);
});
router.get("/warhouse/inventory/:id", (req, res) =>{
    res.status(200);
});

router.post("/warehouse/add", (req, res) =>{
    res.status(201);
   
});
router.post("/inventory/add", (req, res) =>{
    res.status(201);
   
});










module.exports = router;