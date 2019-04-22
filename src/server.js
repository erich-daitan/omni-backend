const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");


const app = express();


const server = require("http").Server(app);
const io = require("socket.io")(server);
mongoose.connect(
    "mongodb+srv://mongouser:2xzuV7LO1CfheeFv@mongodbtcc-5yvxn.mongodb.net/semanaomni?retryWrites=true",
    { useNewUrlParser: true }
  );
io.on("connection", socket => {
    socket.on("connectRoom", box => {
        socket.join(box);
    })
});

app.use((req, res, next) => {
    req.io = io;
    return next();
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use(require('./routes'));
server.listen(process.env.PORT || 8080);
