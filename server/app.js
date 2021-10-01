const express = require('express');
const router = require('./routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.debug('[', req.method, ']', res.statusCode, req.originalUrl);
	next();
});

app.use('/', router);

app.listen(PORT, () => {
	console.clear();
	console.debug(`Server Running http://localhost:${PORT}`);
});

module.exports = app;
