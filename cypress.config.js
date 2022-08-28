const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		baseUrl: 'https://api.openweathermap.org',
    viewportWidth: 1300,
    viewportHeight: 1000,
    requestTimeout: 20000,
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 20000,
    reporter: 'junit',
    reporterOptions: {
      mochaFile: 'cypress/results/test-results-[hash].xml',
      toConsole: true,
    },
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		env: {
			apiKey: '89afd55c9f5d1bac53549cf376f922dd',
		},
	},
});
