'use strict';

// Aus controller
angular.module('aus').controller('AusController', ['$scope', '$stateParams', '$location', 'Authentication', 'Aus',
	function($scope, $stateParams, $location, Authentication, Aus) {
		$scope.authentication = Authentication;

		// Create new Au
		$scope.create = function() {
			// Create new Au object
			var au = new Aus ({
				name: this.name
			});

			// Redirect after save
			au.$save(function(response) {
				$location.path('aus/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Au
		$scope.remove = function(au) {
			if ( au ) { 
				au.$remove();

				for (var i in $scope.aus) {
					if ($scope.aus [i] === au) {
						$scope.aus.splice(i, 1);
					}
				}
			} else {
				$scope.au.$remove(function() {
					$location.path('aus');
				});
			}
		};

		// Update existing Au
		$scope.update = function() {
			var au = $scope.au;

			au.$update(function() {
				$location.path('aus/' + au._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Aus
		$scope.find = function() {
			$scope.aus = Aus.query();
		};

		// Find existing Au
		$scope.findOne = function() {
			$scope.au = Aus.get({ 
				auId: $stateParams.auId
			});
		};
	}
]);