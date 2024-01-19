const express = require("express");
const router = express();
const knexConfig = require('../knexfile.js').development; 
const knex = require('knex')(knexConfig);

router.get("/", (req, res) =>{
    res.status(200)
});

router.get('/warehouses', async (req, res) => {
        try {
            const warehouses = await knex('warehouses');
            res.status(200).json(warehouses);
        } catch (error) {
            res.status(400).json(`Error getting warehouses: ${error}`);
        }
    }
)
router.get("/inventory", (req, res) =>{
    res.status(200)
});

router.get("/warehouse/:id", (req, res) =>{
    res.status(200);
});

router.get("/inventory/:id", (req, res) =>{
    res.status(200);
});
router.get("/warhouse/:id/inventory", (req, res) =>{
    res.status(200);
});

router.post("/warehouse/add", (req, res) =>{
    res.status(201);
   
});
router.post("/inventory/add", (req, res) =>{
    res.status(201);
   
});










module.exports = router;