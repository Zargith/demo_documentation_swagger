var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
	res.status(200).send({ message: "You can access the documentation at route /docs" });
});

router.get("/health", function (req, res) {
	res.status(200).send({ message: "OK" });
});


module.exports = router;
