const knex = require('knex')(require('../knexfile'));

const index = async (_req, res) => {
  try {
    const data = await knex('inventories');
    res.status(200).json(data);
  } catch(err) {
    res.status(400).send(`Error retrieving Users: ${err}`)
  }
}


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
        message: `Unable to delete user: ${error}`
      });
    }
  };

  

module.exports = {
  index, 
  remove,
  
}