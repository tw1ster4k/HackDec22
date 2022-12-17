const router = require("express").Router();
const path = require("path");

router.get("/", (req, res) => {
    console.log("hello");
    res.sendFile(path.resolve("public", "hello.html"));
});

module.exports = router;
