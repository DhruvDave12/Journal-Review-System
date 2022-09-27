require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookies = require('cookie-parser');

const {configDB} = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require("./routes/user.routes");

configDB();
const app = express();
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    // 'Access-Control-Allow-Credentials': true
}
app.use(cors(corsOptions));
app.use(cookies());

app.use('/',authRoutes);
app.use('/', userRoutes);

const PORT = 1337 | process.env.PORT;
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT + "🎉");
})