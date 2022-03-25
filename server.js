const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const compression = require("compression");
const session = require("express-session");
const errorHandler = require("errorhandler");
const flash = require("express-flash");

const logger = require("morgan");
const helmet = require("helmet");

//const MongoStore = require("connect-mongo")(session);
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");

const actions = require("./server.actions");

dotenv.config({ path: ".env" });

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("error", (err) => {
	console.error(err);
	console.log("MongoDB connection error.");
	process.exit();
});

/**
 * Express configuration.
 */
function normalizedPort(defaultPort) {
	const port = process.env.PORT || defaultPort;
	if (!Number.isInteger(parseInt(port))) return defaultPort;
	return port;
}

app.set("host", process.env.HOST || "localhost");
app.set("port", normalizedPort(8080));
app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: process.env.SESSION_SECRET,
		cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
		store: MongoStore.create({
			mongoUrl: process.env.MONGODB_URI,
			autoReconnect: true,
		}),
	})
);

app.use(helmet());
app.disable("x-powered-by");
app.use(cors());

/**
 * Static app paths.
 */
app.use(
	"/",
	express.static(path.join(__dirname, "client", "build"), {
		maxAge: 31557600000,
	})
);

/**
 * Primary app routes.
 */
app.post("/payments", actions.payment_post);
app.get("/payments", actions.payment_get);
app.post("/payments/validate", actions.payment_validate_post);

app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === "development") {
	// only use in development
	app.use(errorHandler());
} else {
	app.use((err, req, res, next) => {
		console.error(err);
		res.status(500).send("Server Error");
	});
}

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
	console.log(`Server is listening on ${app.get("host")}:${app.get("port")}`);
	console.log("  Press CTRL-C to stop\n");
});
