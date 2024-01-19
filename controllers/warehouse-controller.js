const knexConfig = require("../knexfile.js").development;
const knex = require("knex")(knexConfig);

const index = async (_req, res) => {
  try {
    const data = await knex('warehouses');
    res.status(200).json(data);
  } catch(err) {
    res.status(400).send(`Error retrieving Users: ${err}`)
  }

};




const remove = async (req, res) => {
    try {
      const rowsDeleted = await knex("warehouses")
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
        message: `Unable to delete user: ${error}`
      });
    }
};

const update = async (req, res) => {
    const isPhoneNumValid = (phone) => {
        const pattern = "^\\+1 \\(\\d{3}\\) \\d{3}-\\d{4}$";
        const regex = new RegExp(pattern);
        return regex.test(phone);
    };
      
    const isEmailValid = (email) => {
        const pattern = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";
        const regex = new RegExp(pattern);
        return regex.test(email);
    };
      
    const validateWarehouseData = (data) => {
        const {
          warehouse_name,
          address,
          city,
          country,
          contact_name,
          contact_position,
          contact_phone,
          contact_email,
        } = data;
        if (!warehouse_name || warehouse_name === "") return { valid: false, error: "Warehouse name is required." };
        if (!address || address === "") return { valid: false, error: "Address is required." };
        if (!city || city === "") return { valid: false, error: "City is required." };
        if (!country || country === "") return { valid: false, error: "Country is required." };
        if (!contact_name || contact_name === "") return { valid: false, error: "Contact Name is required." };
        if (!contact_position || contact_position === "") return { valid: false, error: "Contact Position is required." };
        if (!contact_phone || contact_phone === "") return { valid: false, error: "Contact Phone Number is required." };
        if (!contact_email || contact_email === "") return { valid: false, error: "Contact Email is required." };
        if (!isPhoneNumValid(contact_phone))
          return {
            valid: false,
            error:
              "Phone number format is invalid. Expected format: +1 (123) 456-7890.",
          };
        if (!isEmailValid(contact_email))
          return { valid: false, error: "Email format is invalid." };
      
        return { valid: true};
    };
    const validation = validateWarehouseData(req.body);
    if (!validation.valid) {
      return res.status(400).json({
        error: validation.error
      });
    }
    try {
      const warehouseId = req.params.id;
      const updatedData = req.body;
      const updated = await knex("warehouses")
        .where({ id: warehouseId })
        .update(updatedData);
      if (updated) {
        const updatedWarehouse = await knex("warehouses")
          .where({ id: warehouseId })
          .first();
        return res.status(200).json(updatedWarehouse);
      } else {
        return res.status(404).json({ error: "Warehouse not found." });
      }
    } catch (error) {
      return res.status(500).json({ error: "Server error" });
    }
}

  

module.exports = {
  index,
  remove,
  update,
}