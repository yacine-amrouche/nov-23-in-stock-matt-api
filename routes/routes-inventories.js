const router = require('express').Router();
const inventories = require("../controllers/inventory-controller");

router.route('/')
    .get(inventories.index);
    // add route for adding
router.route("/:id")
    .delete(inventories.remove);
    //add route for editing


module.exports = router;