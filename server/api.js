import { Router } from "express";

import { Connection } from "./db";

const router = new Router();

router.get("/cleaners", (_, res, next) => {
	Connection.connect((err, pool) => {
		if (err) {
			return next(err);
		}

		pool
			.query("SELECT * FROM cleaners")
			.then(({ rows }) => {
				return res.json({ cleaners: rows });
			})
			.catch((e) => {
				console.error(e);
				next(e);
			});
	});
});

		res.json({ message: "Hello, world!" });
	});
});

export default router;
