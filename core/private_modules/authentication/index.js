// public modules
var jwt		= require('jwt-simple');

// local modules
var server	= requireLocal('server');
var config	= requireLocal('config').config;

// getting models
var User = require('./User');

// route for logging in
server.publicRouter.post('/api/authenticate', function(req, res, next){
	User.findOne({username: req.body.username}, function(err, user){
		if(err)
			return next(err);
		if(!user)
			return res.status(401).send("Wrong username");
		if(!user.validPassword(req.body.password))
			return res.status(401).send("Wrong password");

		// calculate expired time
		var expires = Date.now()+config.tokenExpireTime;

		// create token
		var token = jwt.encode({
			iss: user._id,
			exp: expires
		}, config.secret);

		// send response
		res.status(200).json({
			token: token,
			expires: expires
		}).end();
	});
});

// authorization middleware
var middleware = function(req, res, next){
	// retrieving token from request
	var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

	if(!token)
		return res.status(400).send("Missing token");

	try{
		// decoding token
		var decoded = jwt.decode(token, config.secret);

		// checking token expired time
		if(decoded.exp < Date.now())
			return res.status(403).send("Token expired");

		// retrieving user
		User.findById(decoded.iss, function(err, user){
			if(err)
				return next(err);

			if(!user)
				return res.status(403).send("Non existing user");

			// assign user to request
			req.user = user;

			// continue
			return next();
		});

	} catch(err){
		return res.status(403).send("Wrong token");
	}
};

// exports
module.exports = {
	User: User,
	authorizationMiddleware: middleware
};
