describe('Excluding parts of the response', () => {
	it('Exclude Current Weather Forecast', () => {
		// from the fixtures file, use Sydney for this example
		cy.fixture('australiaMajorCities').then(cities => {
			const exclude = 'current';
			cy.apiCallOpenWeatherMap(
				cities.Sydney.lat,
				cities.Sydney.lon,
				exclude
			).then(response => {
				expect(response.status).to.eq(200);
				assert.notExists(
					response.body.current,
					'Current weather data is excluded from the response'
				);
				assert.exists(
					response.body.minutely,
					'Minute weather data is present on the response'
				);
				assert.exists(
					response.body.hourly,
					'Hourly weather data is present on the response'
				);
				assert.exists(
					response.body.daily,
					'Daily weather data is present on the response'
				);
			});
		});
	});

	it('Exclude Minute Weather Forecast', () => {
		// from the fixtures file, use Melbourne for this example
		cy.fixture('australiaMajorCities').then(cities => {
			const exclude = 'minutely';
			cy.apiCallOpenWeatherMap(
				cities.Melbourne.lat,
				cities.Melbourne.lon,
				exclude
			).then(response => {
				assert.exists(
					response.body.current,
					'Current weather data is present on the response'
				);
				assert.notExists(
					response.body.minutely,
					'Minute weather data is excluded from the response'
				);
				assert.exists(
					response.body.hourly,
					'Hourly weather data is present on the response'
				);
				assert.exists(
					response.body.daily,
					'Daily weather data is present on the response'
				);
			});
		});
	});

	it('Exclude Hourly Weather Forecast', () => {
		// from the fixtures file, use Melbourne for this example
		cy.fixture('australiaMajorCities').then(cities => {
			const exclude = 'hourly';
			cy.apiCallOpenWeatherMap(
				cities.Melbourne.lat,
				cities.Melbourne.lon,
				exclude
			).then(response => {
				assert.exists(
					response.body.current,
					'Current weather data is present on the response'
				);
				assert.exists(
					response.body.minutely,
					'Minute  weather data is present on the response'
				);
				assert.notExists(
					response.body.hourly,
					'Hourly weather data is excluded from the response'
				);
				assert.exists(
					response.body.daily,
					'Daily weather data is present on the response'
				);
			});
		});
	});

	it('Exclude Daily Weather Forecast', () => {
		// from the fixtures file, use Adelaide for this example
		cy.fixture('australiaMajorCities').then(cities => {
			const exclude = 'daily';
			cy.apiCallOpenWeatherMap(
				cities.Adelaide.lat,
				cities.Adelaide.lon,
				exclude
			).then(response => {
				assert.exists(
					response.body.current,
					'Current weather data is present on the response'
				);
				assert.exists(
					response.body.hourly,
					'Hourly weather data is present on the response'
				);
				assert.exists(
					response.body.minutely,
					'Minute weather data is present on the response'
				);
				assert.notExists(
					response.body.daily,
					'Daily weather data is excluded from the response'
				);
			});
		});
	});
});
