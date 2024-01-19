const express = require("express");
const app = express();
const PORT = process.env.PORT || 5050;


const warehouses = require("./routes/routes-warehouse");
app.use(express.json())
app.use("/api/warehouses", warehouses);

const inventories = require("./routes/routes-inventories");
app.use("/api/inventories", inventories);



app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});