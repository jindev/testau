'use strict';

//Setting up route
angular.module('aus').config(['$stateProvider',
	function($stateProvider) {
		// Aus state routing
		$stateProvider.
		state('listAus', {
			url: '/aus',
			templateUrl: 'modules/aus/views/list-aus.client.view.html'
		}).
		state('createAu', {
			url: '/aus/create',
			templateUrl: 'modules/aus/views/create-au.client.view.html'
		}).
		state('viewAu', {
			url: '/aus/:auId',
			templateUrl: 'modules/aus/views/view-au.client.view.html'
		}).
		state('editAu', {
			url: '/aus/:auId/edit',
			templateUrl: 'modules/aus/views/edit-au.client.view.html'
		});
	}
]);