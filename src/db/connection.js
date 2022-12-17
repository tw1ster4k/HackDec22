const mongoose = require("mongoose");

require("dotenv").config();

const { DB_NAME, DB_URL } = process.env;

mongoose.set("strictQuery", true);

module.exports = () => {
    mongoose.connect(`${DB_URL}${DB_NAME}`, (err) => {
        if (err) throw err;
        console.log(`Connection to ${DB_NAME} success`);
    });
};
