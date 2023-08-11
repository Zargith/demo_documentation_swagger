const express = require("express");
const router = express.Router();
const authService = require("../services/auth.js");

// GET ALL USERS
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
	
	// TODO : check if user already exists in database, if not add it
	res.status(200).send({ message: "User logged in", data: { _id: "1", name: "John Doe", email: "john.doe@email.com" } });
});


// GET USER BY ID
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

	// TODO : generate token and send it in "data" too like data: token: "token", user: { ... }
	res.status(200).send({ message: "User updated" });
});


// DELETE LOGGED USER
router.delete("/", authService.isAuthenticated, function (req, res) {
	// TODO: delete user from database
	res.status(200).send({ message: "User deleted" });
});

module.exports = router;
