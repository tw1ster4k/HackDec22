const express = require("express");
const app = express();
const path = require("path");
const dbConnection = require("./src/db/connection");

require("dotenv").config();
dbConnection();

app.use(express.static(path.resolve("public")));

//routes

const apiRouter = require("./src/routes/api");
const indexRouter = require("./src/routes/index");
const gameRouter = require("./src/routes/game");

// app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/", gameRouter);
// было как внизу
// app.use("/game", gameRouter);

app.listen(process.env.PORT || 3000)
    .on("error", (error) => {
        console.log(error);
    })
    .on("listening", () => {
        console.log("Success");
    });
