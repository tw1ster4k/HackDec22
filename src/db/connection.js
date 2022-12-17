const mongoose = require("mongoose");

require("dotenv").config();

const dbPath = process.env.DB_PATH;
const dbName = process.env.DB_NAME;

module.exports = () => {
    console.log(dbPath);
};
