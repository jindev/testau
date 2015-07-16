'use strict';

//Aus service used to communicate Aus REST endpoints
angular.module('aus').factory('Aus', ['$resource',
	function($resource) {
		return $resource('aus/:auId', { auId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);