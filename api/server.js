require("dotenv").config();  // ✅ debe ser la primera línea
const { connect } = require("./db");  // ❌ nunca antes de dotenv.config()
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

app.use(cors());

app.use(cookieParser());

app.use(express.json());


connect();

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);


const portLisent =3300;
app.listen(portLisent, () => {
    connect();
    console.log(`Example app listening on port ${portLisent}!`)    
})