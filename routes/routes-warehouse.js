const router = require('express').Router();
const warehouses = require('../controllers/warehouse-controller');

router.route('/')
    .get(warehouses.index);
router.route("/:id")
    .delete(warehouses.remove);
module.exports = router;