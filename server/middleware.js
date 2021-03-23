const cache = require('memory-cache');
module.exports = (req, res, next) => {
	const key = req.originalUrl || req.url;
	const cachedBody = cache.get(key);

	if (cachedBody) {
		return res.send(cachedBody);
	} else {
		res.sendResponse = res.send;
		res.send = body => {
			cache.put(req.originalUrl, JSON.parse(body), 1000 * 3600);
			res.sendResponse(body);
		};
	}
	next();
};
