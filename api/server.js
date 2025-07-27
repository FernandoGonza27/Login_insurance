const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connect } = require("./db");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
console.log("PG_PASSWORD:", typeof process.env.PG_PASSWORD, process.env.PG_PASSWORD);

connect();

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);


const portLisent =3300;
app.listen(portLisent, () => {
    connect();
    console.log(`Example app listening on port ${portLisent}!`)    
})