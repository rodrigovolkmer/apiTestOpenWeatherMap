const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		baseUrl: 'https://api.openweathermap.org',
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		env: {
			apiKey: '89afd55c9f5d1bac53549cf376f922dd',
		},
	},
});
