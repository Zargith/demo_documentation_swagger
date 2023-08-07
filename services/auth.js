function isAuthenticated(req, res, next) {
	if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
		res.status(401).send({ message: "Unauthorized, you should provide a valid token" });
		return;
	}

	next();
}

module.exports = {
	isAuthenticated
};