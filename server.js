const express = require('express');
const app = express();
require("dotenv").config();
app.use(express.json());
const cors = require('cors')
const warehouseRoutes = require('./routes/routes-warehouse.js');
const inventoryRoutes = require("./routes/routes-inventories.js")




app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
app.use(cors({ origin: CORS_ORIGIN }));

app.use('/api/warehouses/', warehouseRoutes);
// app.use('/api', warehouseRoutes); 

app.use('/api/inventories/', inventoryRoutes);

app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`);
})