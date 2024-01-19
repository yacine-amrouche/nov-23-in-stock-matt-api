const express = require("express");
const router = express();
const knexConfig = require('../knexfile.js').development; 
const knex = require('knex')(knexConfig);

router.get("/", (req, res) =>{
    res.status(200)
});

router.route('/warehouses').get(
    async (req, res) => {
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

const isPhoneNumValid = (phone) => {
    const pattern = "^\\+1 \\(\\d{3}\\) \\d{3}-\\d{4}$";
    const regex = new RegExp(pattern);
    return regex.test(phone);
}

function isEmailValid(email) {
    const pattern = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";
    const regex = new RegExp(pattern);
    return regex.test(email);
}

const validateWarehouseData = (data) => {
    const {
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email
    } = data;
    if(!warehouse_name || warehouse_name === '') return false;
    if(!address || address === '') return false;
    if(!city || city === '') return false;
    if(!country || country === '') return false;
    if(!contact_name || contact_name === '') return false;
    if(!contact_position || contact_position === '') return false;
    if(!contact_phone || contact_phone === '') return false;
    if(!contact_email || contact_email === '') return false;
    if(!isPhoneNumValid(contact_phone)) return false;
    if(!isEmailValid(contact_email)) return false;

    return true;
}

router.route("/warehouses/:id").put( 
    async (req, res) =>{
        
        try {
            const warehouseId = req.params.id;
            const updatedData = req.body;

            res.status(200);
        } catch (error) {
            console.error("Error updating warehouse: ", error);
        }
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