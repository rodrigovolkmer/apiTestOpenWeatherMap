// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/**
 * Call to OpenWeatherMap One Call API 3.0 as a custom command that can be accessible everywhere
 */
Cypress.Commands.add(
	'apiCallOpenWeatherMap',
	(latitude, longitute, exclude, units ) => {
		cy.request({
			url: '/data/3.0/onecall',
			method: 'GET',
			qs: {
				lat: latitude, // required
				lon: longitute, // required
				exclude: exclude, // default: null
				units: units, // default: standard
				appid: Cypress.env('apiKey'),
			},
		}).then(response => {
			return response;
		});
	}
);
