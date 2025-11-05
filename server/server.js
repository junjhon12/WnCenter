const express = require("express");
const connectDB = require("./config/db");
const app = express();
connectDB();
app.use(express.json({extended: false}));
const PORT = 5000;


app.get("/", (req, res) => {
    res.send("It's working,")
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
app.use("/api/users", require("./routes/api/users"));
