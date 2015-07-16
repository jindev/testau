'use strict';

module.exports = {
	app: {
		title: 'au',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
				'public/lib/fullcalendar/dist/fullcalendar.css',
				'public/lib/font-awesome/css/font-awesome.css',
				'public/lib/textAngular/dist/textAngular.css',

			],
			js: [

				'public/lib/jquery/dist/jquery.min.js',
				'public/lib/moment/min/moment.min.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-ui-calendar/src/calendar.js',
				'public/lib/fullcalendar/dist/fullcalendar.min.js',
				'public/lib/fullcalendar/dist/gcal.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-touch/angular-touch.js', 
				'public/lib/angular-sanitize/angular-sanitize.js', 
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/rangy/rangy-core.js',
				'public/lib/rangy/rangy-serializer.min.js',
				'public/lib/textAngular/dist/textAngular-rangy.min.js',
				'public/lib/textAngular/dist/textAngular-sanitize.min.js',
				'public/lib/textAngular/dist/textAngular.min.js',
				'public/lib/textAngular/dist/textAngularSetup.js',


			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
