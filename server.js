//? IMPORT -> REQUIRE
require("dotenv").config();
require("./config/database");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug");
const usersRouter = require("./routes/api/usersRoute");

//? APP
const app = express();

//? MIDDLEWARE
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));
app.use(require("./config/checkToken"));
// Put API routes here, before the "catch all" route
app.use("/api/users", usersRouter);

//? ROUTES
app.get("/api", (req, res) => {
	res.send("Hi");
});
app.use("/api/users", usersRouter);

//! A single "catch all" route is required to serve the index.html when any non-AJAX "API" request is received by the Express app:
//! just a precursor to react router
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "dist", "index.html"));
});

//? LISTEN
const port = process.env.PORT || 3000;

app.listen(port, function () {
	debug(`Express app running on port ${port}`);
});
