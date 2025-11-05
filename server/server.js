const connectDB = require('./config/db');
const express = require("express");
const app = express();
connectDB();
const PORT = 5000;

app.get("/", (req, res) => {
    res.send("It's working,")
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})