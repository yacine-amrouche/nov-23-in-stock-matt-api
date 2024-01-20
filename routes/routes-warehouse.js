const router = require("express").Router();
const warehouses = require("../controllers/warehouse-controller.js");

router.route("/").get(warehouses.index).post(warehouses.add);
router.route("/:id").delete(warehouses.remove).put(warehouses.update);
module.exports = router;

router.route("/:id/inventories").get(warehouses.joinTable);
