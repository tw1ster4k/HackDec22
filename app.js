const express = require("express");
const app = express();
const path = require("path");
const dbConnection = require("./src/db/connection");

require("dotenv").config();
dbConnection();
//routes
const apiRouter = require("./src/routes/api");

app.use(express.static(path.resolve("public")));

app.use("/api", apiRouter);

app.listen(process.env.PORT || 3000)
    .on("error", (error) => {
        console.log(error);
    })
    .on("listening", () => {
        console.log("Success");
    });
