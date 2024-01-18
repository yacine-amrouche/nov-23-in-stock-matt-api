const express = require('express');
const app = express();
require("dotenv").config();
app.use(express.json());
const cors = require('cors')
const warehouseRoutes = require('./routes/routes.js');




app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
app.use(cors({ origin: CORS_ORIGIN }));


app.use('/api', warehouseRoutes); // GET all Warehouses endpoint


app.listen(8080, () =>{
    console.log(`listening on port ${PORT}`);
})