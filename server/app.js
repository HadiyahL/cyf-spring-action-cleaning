import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import customers from "./routes/customers";
import workers from "./routes/workers";
import jobs from "./routes/jobs";
import branches from "./routes/branches";
import { httpsOnly, logErrors, pushStateRouting } from "./middleware";

const apiRoot = "/api";
const staticDir = path.join(__dirname, "static");

const app = express();

app.use(express.json());

app.use(
	helmet({
		contentSecurityPolicy: false,
	})
);
app.use(logErrors());
app.use(morgan("dev"));

if (app.get("env") === "production") {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

app.use(apiRoot, customers);
app.use(apiRoot, workers);
app.use(apiRoot, jobs);
app.use(apiRoot, branches);

app.use(express.static(staticDir));
app.use(pushStateRouting(apiRoot, staticDir));

export default app;
