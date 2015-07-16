'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Au = mongoose.model('Au'),
	_ = require('lodash');

/**
 * Create a Au
 */
exports.create = function(req, res) {
	var au = new Au(req.body);
	au.user = req.user;

	au.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(au);
		}
	});
};

/**
 * Show the current Au
 */
exports.read = function(req, res) {
	res.jsonp(req.au);
};

/**
 * Update a Au
 */
exports.update = function(req, res) {
	var au = req.au ;

	au = _.extend(au , req.body);

	au.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(au);
		}
	});
};

/**
 * Delete an Au
 */
exports.delete = function(req, res) {
	var au = req.au ;

	au.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(au);
		}
	});
};

/**
 * List of Aus
 */
exports.list = function(req, res) { 
	Au.find().sort('-created').populate('user', 'displayName').exec(function(err, aus) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(aus);
		}
	});
};

/**
 * Au middleware
 */
exports.auByID = function(req, res, next, id) { 
	Au.findById(id).populate('user', 'displayName').exec(function(err, au) {
		if (err) return next(err);
		if (! au) return next(new Error('Failed to load Au ' + id));
		req.au = au ;
		next();
	});
};

/**
 * Au authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.au.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
