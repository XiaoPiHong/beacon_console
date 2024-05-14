const fs = require("fs-extra");
const path = require("path");

const source = path.join(__dirname, "dist", "index.html");
const destination = path.join(__dirname, "dist", "404.html");

fs.copy(source, destination)
	.then(() => console.log("index.html was copied to 404.html"))
	.catch(err => {
		console.error("Error copying index.html to 404.html:", err);
		process.exit(1);
	});
