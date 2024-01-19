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

const update = async (req, res) => {

    const validation = validateInventoryItemData(req.body);
    if (!validation.valid) {
        return res.status(400).json({
            error: validation.error
        });
    }
    try {
        const inventoryItemId = req.params.id;
        const updatedData = req.body;
        const updated = await knex('')
    } catch (error) {
        res.status(400).json({ error: "Server error" });
    }
};

module.exports = {
  index,
  remove,
  //export functions, like update, add
};
