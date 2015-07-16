'use strict';

(function() {
	// Aus Controller Spec
	describe('Aus Controller Tests', function() {
		// Initialize global variables
		var AusController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Aus controller.
			AusController = $controller('AusController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Au object fetched from XHR', inject(function(Aus) {
			// Create sample Au using the Aus service
			var sampleAu = new Aus({
				name: 'New Au'
			});

			// Create a sample Aus array that includes the new Au
			var sampleAus = [sampleAu];

			// Set GET response
			$httpBackend.expectGET('aus').respond(sampleAus);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.aus).toEqualData(sampleAus);
		}));

		it('$scope.findOne() should create an array with one Au object fetched from XHR using a auId URL parameter', inject(function(Aus) {
			// Define a sample Au object
			var sampleAu = new Aus({
				name: 'New Au'
			});

			// Set the URL parameter
			$stateParams.auId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/aus\/([0-9a-fA-F]{24})$/).respond(sampleAu);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.au).toEqualData(sampleAu);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Aus) {
			// Create a sample Au object
			var sampleAuPostData = new Aus({
				name: 'New Au'
			});

			// Create a sample Au response
			var sampleAuResponse = new Aus({
				_id: '525cf20451979dea2c000001',
				name: 'New Au'
			});

			// Fixture mock form input values
			scope.name = 'New Au';

			// Set POST response
			$httpBackend.expectPOST('aus', sampleAuPostData).respond(sampleAuResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Au was created
			expect($location.path()).toBe('/aus/' + sampleAuResponse._id);
		}));

		it('$scope.update() should update a valid Au', inject(function(Aus) {
			// Define a sample Au put data
			var sampleAuPutData = new Aus({
				_id: '525cf20451979dea2c000001',
				name: 'New Au'
			});

			// Mock Au in scope
			scope.au = sampleAuPutData;

			// Set PUT response
			$httpBackend.expectPUT(/aus\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/aus/' + sampleAuPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid auId and remove the Au from the scope', inject(function(Aus) {
			// Create new Au object
			var sampleAu = new Aus({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Aus array and include the Au
			scope.aus = [sampleAu];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/aus\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleAu);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.aus.length).toBe(0);
		}));
	});
}());