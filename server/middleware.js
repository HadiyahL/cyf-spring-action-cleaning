import path from "path";
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

export const httpsOnly = () => (req, res, next) => {
	if (!req.secure) {
		return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
	}
	next();
};

export const logErrors = () => (err, _, res, next) => {
	if (res.headersSent) {
		return next(err);
	}
	console.error(err);
	res.sendStatus(500);
};

export const pushStateRouting = (apiRoot, staticDir) => (req, res, next) => {
	if (req.method === "GET" && !req.url.startsWith(apiRoot)) {
		return res.sendFile(path.join(staticDir, "index.html"));
	}
	next();
};

// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
export const checkAuth = jwt({
	// Dynamically provide a signing key
	// based on the kid in the header and
	// the signing keys provided by the JWKS endpoint.
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: "https://dev-8jdk6hoj.eu.auth0.com/.well-known/jwks.json",
	}),

	// Validate the audience and the issuer.
	audience: "https://springactioncleaning/",
	issuer: "https://dev-8jdk6hoj.eu.auth0.com/",
	algorithms: ["RS256"],
});

export const checkPermission = (permission) => (req, res, next) => {
	const { permissions } = req.user;
	console.log(`permissions`, permissions);
	if (permissions.includes(permission)) {
		return next();
	}

	res.status(401).json({ error: { message: "Unauthorized" } });
};

/*
	Comment out above two functions and uncomment below to ignore authentication checks but be aware
	that some role based stuff is not going to work
	For example email with token will not come and
	db queries fail / come back empty
*/

// export const checkAuth = (req, res, next) => {
//  console.log("process.env.NODE_ENV :>> ", process.env.NODE_ENV);
//  next();
// };
//
// export const checkPermission = () => (req, res, next) => {
//  req.user = {};
//  next();
// };
