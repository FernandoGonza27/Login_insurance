require("dotenv").config();  // ✅ debe ser la primera línea
const { connect } = require("./db");  // ❌ nunca antes de dotenv.config()
const express = require("express");
const cors = require("cors");
const  bodyParser = require('body-parser')
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();


app.use(cors({
  origin: "http://localhost:5173", //  origen exacto del frontend
  credentials: true                //  permite cookies cross-origin
}));

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