require("dotenv").config({path : './config.env'});
const express = require("express");
require("./config/db")();

const app = express();


app.use(express.json());

app.use("/app/api/todo/mongo/auth",require("./routes/auth"));
app.use("/app/api/todo/mongo",require("./routes/todo"));



const port = process.env.PORT || 5000;

app.listen(port, () =>console.log( `Server running on port ${port} 🔥`));