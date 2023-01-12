const express = require("express");
const path = require("path");
const cors = require("cors")
const app = express();

require("dotenv").config();


app.use(cors())
app.use(express.static("./client/build"));

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"))
})

const PORT = 1055;

app.listen(PORT, () => console.log(`server start on port ${PORT}`));