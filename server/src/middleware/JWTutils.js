const jwt = require("jsonwebtoken");

exports.verifyJWT = (req, res, next) => {
	const authHeader = req.headers.authorization || req.headers.Authorization;

	if (!authHeader?.startsWith("Bearer ")) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	const token = authHeader.split(" ")[1];

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) {
			return res.status(403).json({ message: "Forbidden" });
		}
		req.user = decoded.UserInfo;
		next();
	});
};

exports.checkAdmin = (req, res, next) => {
	if (req.user.role !== "admin") {
		return res.status(403).json({ message: "Forbidden" });
	}
	next();
};
