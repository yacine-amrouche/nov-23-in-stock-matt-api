const router = require('express').Router();
const inventories = require('../controllers/inventory-controller');

router.route('/').get(inventories.index);
router.route("/:id").delete(inventories.remove);

module.exports = router;