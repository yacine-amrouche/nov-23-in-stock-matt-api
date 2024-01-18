const express = require('express');
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());








app.listen(8080, () =>{
    console.log(`listening on port ${PORT}`);
})