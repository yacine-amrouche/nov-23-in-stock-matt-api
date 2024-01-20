const router = require('express').Router();
const inventories = require("../controllers/inventory-controller");

router.route('/')
    .get(inventories.allInventoryItems);
    // add route for adding
router.route("/:id")
    .delete(inventories.remove)
    .put(inventories.update)
    .get(inventories.getIndividual);
    //add route for editing


module.exports = router;