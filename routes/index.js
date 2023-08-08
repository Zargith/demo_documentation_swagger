var express = require("express");
var router = express.Router();

/**
 * @swagger
 *   /:
 *     get:
 *       tags: ["/"]
 *       description: / entrypoint of the API.
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: You can access the documentation at route /docs
*/
router.get("/", function (req, res) {
	res.status(200).send({ message: "You can access the documentation at route /docs" });
});


/**
 * @swagger
 *   /health:
 *     get:
 *       tags: ["/"]
 *       description: Get health status of the API.
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: OK
*/
router.get("/", function (req, res) {
	res.status(200).send({ message: "You can access the documentation at route /docs" });
});
router.get("/health", function (req, res) {
	res.status(200).send({ message: "OK" });
});


module.exports = router;
