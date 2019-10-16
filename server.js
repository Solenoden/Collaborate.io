const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());
// Routes
const userRouter = require("./routes/users");
app.use("/user", userRouter);

const projectRouter = require("./routes/projects");
app.use("/project", projectRouter);
// Connect to MongoDB database
const mongoose = require("mongoose");
const url = "mongodb+srv://admin:admin@cluster0-fpvfh.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true})
.catch((err) => console.log("Mongoose connect error: " + err));

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Successfully connected to MongoDB database");
});
// Start up server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Starting up server on port " + PORT);
});