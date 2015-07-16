'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Au = mongoose.model('Au'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, au;

/**
 * Au routes tests
 */
describe('Au CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Au
		user.save(function() {
			au = {
				name: 'Au Name'
			};

			done();
		});
	});

	it('should be able to save Au instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Au
				agent.post('/aus')
					.send(au)
					.expect(200)
					.end(function(auSaveErr, auSaveRes) {
						// Handle Au save error
						if (auSaveErr) done(auSaveErr);

						// Get a list of Aus
						agent.get('/aus')
							.end(function(ausGetErr, ausGetRes) {
								// Handle Au save error
								if (ausGetErr) done(ausGetErr);

								// Get Aus list
								var aus = ausGetRes.body;

								// Set assertions
								(aus[0].user._id).should.equal(userId);
								(aus[0].name).should.match('Au Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Au instance if not logged in', function(done) {
		agent.post('/aus')
			.send(au)
			.expect(401)
			.end(function(auSaveErr, auSaveRes) {
				// Call the assertion callback
				done(auSaveErr);
			});
	});

	it('should not be able to save Au instance if no name is provided', function(done) {
		// Invalidate name field
		au.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Au
				agent.post('/aus')
					.send(au)
					.expect(400)
					.end(function(auSaveErr, auSaveRes) {
						// Set message assertion
						(auSaveRes.body.message).should.match('Please fill Au name');
						
						// Handle Au save error
						done(auSaveErr);
					});
			});
	});

	it('should be able to update Au instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Au
				agent.post('/aus')
					.send(au)
					.expect(200)
					.end(function(auSaveErr, auSaveRes) {
						// Handle Au save error
						if (auSaveErr) done(auSaveErr);

						// Update Au name
						au.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Au
						agent.put('/aus/' + auSaveRes.body._id)
							.send(au)
							.expect(200)
							.end(function(auUpdateErr, auUpdateRes) {
								// Handle Au update error
								if (auUpdateErr) done(auUpdateErr);

								// Set assertions
								(auUpdateRes.body._id).should.equal(auSaveRes.body._id);
								(auUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Aus if not signed in', function(done) {
		// Create new Au model instance
		var auObj = new Au(au);

		// Save the Au
		auObj.save(function() {
			// Request Aus
			request(app).get('/aus')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Au if not signed in', function(done) {
		// Create new Au model instance
		var auObj = new Au(au);

		// Save the Au
		auObj.save(function() {
			request(app).get('/aus/' + auObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', au.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Au instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Au
				agent.post('/aus')
					.send(au)
					.expect(200)
					.end(function(auSaveErr, auSaveRes) {
						// Handle Au save error
						if (auSaveErr) done(auSaveErr);

						// Delete existing Au
						agent.delete('/aus/' + auSaveRes.body._id)
							.send(au)
							.expect(200)
							.end(function(auDeleteErr, auDeleteRes) {
								// Handle Au error error
								if (auDeleteErr) done(auDeleteErr);

								// Set assertions
								(auDeleteRes.body._id).should.equal(auSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Au instance if not signed in', function(done) {
		// Set Au user 
		au.user = user;

		// Create new Au model instance
		var auObj = new Au(au);

		// Save the Au
		auObj.save(function() {
			// Try deleting Au
			request(app).delete('/aus/' + auObj._id)
			.expect(401)
			.end(function(auDeleteErr, auDeleteRes) {
				// Set message assertion
				(auDeleteRes.body.message).should.match('User is not logged in');

				// Handle Au error error
				done(auDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Au.remove().exec();
		done();
	});
});