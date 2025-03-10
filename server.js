const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoutes');
const connectMongoDB = require('./config/dbConfig');

const app = express();
dotenv.config();
connectMongoDB();

app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use('/api/user', userRoute);

//          Home route to check if the sevrer is up nd running
app.get("/", (req, res) => {
    res.send("Server Established");
});

//          wait for the db connection before starting the server
mongoose.connection.once('open', () => {
    console.log("DB Connected");
    //      starting the server after the db connection is established
    app.listen(PORT, () => {
        console.log("Server is runnning on the port", PORT);
    });    
});

//          error handling for db connection issues
mongoose.connection.on('error', (err) => {
    console.error(`DB Connection Error${err}`);
});
