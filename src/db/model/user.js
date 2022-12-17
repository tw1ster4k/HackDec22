const { model, Schema } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    score: Number,
});

module.exports = model("User", userSchema);
