require("dotenv").config({path : './config.env'});
const express = require("express");
require("./config/db")();

const app = express();


app.use(express.json());





const port = process.env.PORT || 5000;

app.listen(port, () =>console.log( `Server running on port ${port} 🔥`));