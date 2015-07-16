'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var aus = require('../../app/controllers/aus.server.controller');

	// Aus Routes
	app.route('/aus')
		.get(aus.list)
		.post(users.requiresLogin, aus.create);

	app.route('/aus/:auId')
		.get(aus.read)
		.put(users.requiresLogin, aus.hasAuthorization, aus.update)
		.delete(users.requiresLogin, aus.hasAuthorization, aus.delete);

	// Finish by binding the Au middleware
	app.param('auId', aus.auByID);
};
