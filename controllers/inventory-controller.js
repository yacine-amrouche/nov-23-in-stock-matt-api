const knexConfig = require("../knexfile.js").development;
const knex = require("knex")(knexConfig);

const index = async (_req, res) => {
  try {
    const data = await knex("inventories");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving Users: ${err}`);
  }
};

const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex("inventories")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `User with ID ${req.params.id} not found` });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: `Unable to delete user: ${error}`,
    });
  }
};

// const update = async (req, res) => {
    
//     const warehouseExists = await knex('warehouses').where({ id: warehouse_id }).first();
//     if(!warehouseExists) {
//         return { valid: false, error: "Warehouse does not exist in the warehouse table" };
//     } 
//     return { valid: true };
//     }

//     const validateInventoryItemData = (data) => {
//         const {
//             warehouse_id,
//             item_name,
//             description,
//             category,
//             status,
//             quantity,
//         } = data;
//         if (!warehouse_id || warehouse_id === "") return { valid: false, error: "Warehouse ID is required." };
//         if (!item_name || item_name === "") return { valid: false, error: "Item Name is required." };
//         if (!description || description === "") return { valid: false, error: "Item Description is required." };
//         if (!category || category === "") return { valid: false, error: "Item Category is required." };
//         if (!status || status === "") return { valid: false, error: "Item Status is required." };
//         if (!quantity || quantity === "") return { valid: false, error: "Item Quantity is required." };
    
//     }
    
//     const validation = validateInventoryItemData(req.body);
//     if (!validation.valid) {
//         return res.status(400).json({
//             error: validation.error
//         });
//     }
//     try {
//         const inventoryItemId = req.params.id;
//         const updatedData = req.body;
//         const updated = await knex('inventories')
//             .where({ id: inventoryItemId })
//             .update(updatedData);
//         if(updated) {
//             const updatedInventoryItem = await knex('inventories')
//                 .where({ id: inventoryItemId })
//                 .first();
//             return res.status(200).json(updatedInventoryItem);
//         } else {
//             return res.status(404).json({ error: "Inventory item not found" });
//         }
//     } catch (error) {
//         res.status(400).json({ error: "Server error" });
//     }
// };

const update = async (req, res) => {
    const validateWarehouseExists = async (warehouse_id) => {
        const warehouse = await knex('warehouses').where({ id: warehouse_id }).first();
        return warehouse ? true : false;
    };

    const validateInventoryItemData = async (data) => {
        const {
            warehouse_id,
            item_name,
            description,
            category,
            status,
            quantity,
        } = data;

        if (!warehouse_id || warehouse_id === "") return { valid: false, error: "Warehouse ID is required." };
        if (!await validateWarehouseExists(warehouse_id)) return { valid: false, error: "Warehouse does not exist." };
        if (!item_name || item_name === "") return { valid: false, error: "Item Name is required." };
        if (!description || description === "") return { valid: false, error: "Item Description is required." };
        if (!category || category === "") return { valid: false, error: "Item Category is required." };
        if (!status || status === "") return { valid: false, error: "Item Status is required." };
        if (quantity === undefined || quantity === null || isNaN(Number(quantity))) return { valid: false, error: "Item Quantity is required and must be a number." };

        return { valid: true };
    };

    const validation = await validateInventoryItemData(req.body);
    if (!validation.valid) {
        return res.status(400).json({
            error: validation.error
        });
    }

    try {
        const inventoryItemId = req.params.id;
        const updatedData = req.body;
        const updated = await knex('inventories')
            .where({ id: inventoryItemId })
            .update(updatedData);
        if(updated) {
            const updatedInventoryItem = await knex('inventories')
                .where({ id: inventoryItemId })
                .first();
            return res.status(200).json(updatedInventoryItem);
        } else {
            return res.status(404).json({ error: "Inventory item not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = {
  index,
  remove,
  update,
};
