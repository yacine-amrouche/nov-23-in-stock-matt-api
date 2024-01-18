const express = require('express');
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());




app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
app.use(cors({ origin: CORS_ORIGIN }));





app.listen(8080, () =>{
    console.log(`listening on port ${PORT}`);
})