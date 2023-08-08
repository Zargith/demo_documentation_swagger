const express = require("express");
const router = express.Router();
const authService = require("../services/auth.js");

// Global Swagger properties meant to reuse in many routes
// "schems" is voluntary misspelled to avoid conflict with "schemas" keyword so not to be displayed on documentation
// Reminder: you can use other name to fit your conveniences
/**
 * @swagger
 * components:
 *   schems:
 *     userData:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: User's ID.
 *           example: 646b2c96319268ba1a22c70e
 *         name:
 *           type: string
 *           description: User's name.
 *           example: John Doe
 *         email:
 *           type: string
 *           description: User's email.
 *           example: "john.doe@email.com"
 *   responses:
 *     401:
 *       description: Unauthorized API call.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: The reason of the request failed.
 *                 example: Unauthorized, you should provide a valid token
 *     4XX:
 *       description: The API error response.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: The reason of the request failed.
*/

// GET ALL USERS
/**
 * @swagger
 *   /user:
 *     get:
 *       tags: ["/user"]
 *       description: Get all users. You must provide a token to perform this action.
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schems/userData'
 *         401:
 *           $ref: '#/components/responses/401'
 *         4XX:
 *           $ref: '#/components/responses/4XX'
*/
router.get("/", authService.isAuthenticated, function (req, res) {
	// TODO: get users from database
	// Here is an example of result:
	res.status(200).send({
		data: [
			{ _id: "1", name: "John Doe", email: "john.doe@email.com" },
			{ _id: "2", name: "Jane Doe", email: "jane.doe@email.com" }
		]
	});
});


// REGISTER
/**
 * @swagger
 *   /user:
 *     post:
 *       tags: ["/user"]
 *       description: Create a user account.
 *       requestBody:
 *         required: true
 *         description: The information to give on the body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *                 - name
 *               properties:
 *                 email:
 *                   type: string
 *                   description: User's email (must be unique).
 *                   example: john.doe@email.com
 *                 name:
 *                   type: string
 *                   description: User's username.
 *                   example: John Doe
 *                 password:
 *                   type: string
 *                   example: veryStrongPassword
 *                   description: User's password.
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: User creation validation.
 *                     example: User created
 *         4XX:
 *           $ref: '#/components/responses/4XX'
*/
router.post("/", function (req, res) {
	// TODO: check datas then add user to database
	if (!req.body.name || !req.body.email || !req.body.password) {
		res.status(400).send({ message: "Missing parameters" });
		return;
	}

	if (typeof req.body.name !== "string" || typeof req.body.email !== "string" || typeof req.body.password !== "string") {
		res.status(400).send({ message: "Wrong parameters, should be string" });
		return;
	}

	if (req.body.name.trim() === "" || req.body.email.trim() === "" || req.body.password.trim() === "") {
		res.status(400).send({ message: "Wrong parameters, shouldn't be empty" });
		return;
	}

	res.status(201).send({ message: "User created" });
});


// LOGIN
/**
 * @swagger
 *   /user:
 *     put:
 *       tags: ["/user"]
 *       description: Connect a user.
 *       requestBody:
 *         required: true
 *         description: The information to give on the body.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                   example: john.doe@email.com
 *                   description: User's email.
 *                 password:
 *                   type: string
 *                   example: veryStrongPassword
 *                   description: User's password.
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schems/userData'
 *         4XX:
 *           $ref: '#/components/responses/4XX'
*/
router.put("/", function (req, res) {
	// TODO: check stored datas and compare with given datas
	if (!req.body.email || !req.body.password) {
		res.status(400).send({ message: "Missing parameters" });
		return;
	}

	if (typeof req.body.email !== "string" || typeof req.body.password !== "string") {
		res.status(400).send({ message: "Wrong parameters, should be string" });
		return;
	}

	if (req.body.email.trim() === "" || req.body.password.trim() === "") {
		res.status(400).send({ message: "Wrong parameters, shouldn't be empty" });
		return;
	}

	res.status(200).send({ message: "User logged in", data: { _id: "1", name: "John Doe", email: "john.doe@email.com" } });
});


// GET USER BY ID
/**
 * @swagger
 *   /user/{id}:
 *     get:
 *       tags: ["/user"]
 *       description: Get a specific user. You must provide a token to perform this action.
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: string
 *           required: true
 *           description: ID of the user to retrieve information.
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     $ref: '#/components/schems/userData'
 *         401:
 *           $ref: '#/components/responses/401'
 *         4XX:
 *           $ref: '#/components/responses/4XX'
*/
router.get("/:id", authService.isAuthenticated, function (req, res) {
	// TODO: check if user exists then get it from database
	if (!req.params.id) {
		res.status(400).send({ message: "Missing parameters, you should provide an ID as last parameter in URL" });
		return;
	}

	if (req.params.id === "1") {
		res.status(200).send({ data: { _id: "1", name: "John Doe", email: "john.doe@email.com" } });
		return;
	}
	res.status(404).send({ message: "User not found" });
});


// UPDATE LOGGED USER
/**
 * @swagger
 *   /user:
 *     patch:
 *       tags: ["/user"]
 *       description: Update the connected user account. You must provide a token to perform this action.
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         description: The information to give on the body if you want to update them.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: jonh.doe@email.com
 *                   description: User's email (must be unique).
 *                 username:
 *                   type: string
 *                   example: John Doe
 *                   description: User's username.
 *                 password:
 *                   type: string
 *                   example: veryStrongPassword
 *                   description: User's password.
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: User update validation.
 *                     example: User updated
 *         401:
 *           $ref: '#/components/responses/401'
 *         4XX:
 *           $ref: '#/components/responses/4XX'
*/
router.patch("/", authService.isAuthenticated, function (req, res) {
	// TODO: check datas then update user in database
	let newDatas = {};
	if (req.body.name) {
		if (typeof req.body.name !== "string" || req.body.name.trim() === "") {
			res.status(400).send({ message: "Wrong parameters, should be string and not empty" });
			return;
		}
		newDatas.name = req.body.name;
	}

	if (req.body.email) {
		// TODO: check if already used by another user
		if (typeof req.body.email !== "string" || req.body.email.trim() === "") {
			res.status(400).send({ message: "Wrong parameters, should be string and not empty" });
			return;
		}
		newDatas.email = req.body.email;
	}

	if (req.body.password) {
		if (typeof req.body.password !== "string" || req.body.password.trim() === "") {
			res.status(400).send({ message: "Wrong parameters, should be string and not empty" });
			return;
		}
		newDatas.password = req.body.password;
	}

	res.status(200).send({ message: "User updated" });
});


// DELETE LOGGED USER
/**
 * @swagger
 *   /user:
 *     delete:
 *       tags: ["/user"]
 *       description: Delete a user account. You must provide a token to perform this action.
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: User deletion validation.
 *                     example: User deleted
 *         401:
 *           $ref: '#/components/responses/401'
 *         4XX:
 *           $ref: '#/components/responses/4XX'
*/
router.delete("/", authService.isAuthenticated, function (req, res) {
	// TODO: delete user from database
	res.status(200).send({ message: "User deleted" });
});

module.exports = router;
