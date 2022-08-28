describe('Units parts of the response', () => {
	/**
	 * For these tests, checking if we can change the units on the response.
	 * I will be using Temperature (temp) and wind speed (wind_speed) as examples
	 *
	 * we will make 3 calls on the before function to the same location
	 * and then compare the results with acceptable numbers
	 *
	 * I tried to compare between them but applying a formula was not acceptable
	 * as it would make the test too flaky
	 * as I was having results like:
	 * expected 288.1 to equal 288.09999999999997
	 */

	before(() => {
		// from the fixtures file, use Sydney for all 3 calls
		cy.fixture('australiaMajorCities').then(cities => {
			// standard
			cy.apiCallOpenWeatherMap(
				cities.Sydney.lat,
				cities.Sydney.lon,
				null,
				'standard'
			).as('standard');

			cy.get('@standard')
				.its('body')
				.its('current')
				.its('temp')
				.as('standard_temp');
			cy.get('@standard')
				.its('body')
				.its('current')
				.its('wind_speed')
				.as('standard_wind_speed');

			// metric
			cy.apiCallOpenWeatherMap(
				cities.Sydney.lat,
				cities.Sydney.lon,
				null,
				'metric'
			).as('metric');

			cy.get('@metric')
				.its('body')
				.its('current')
				.its('temp')
				.as('metric_temp');
			cy.get('@metric')
				.its('body')
				.its('current')
				.its('wind_speed')
				.as('metric_wind_speed');

			// imperial
			cy.apiCallOpenWeatherMap(
				cities.Sydney.lat,
				cities.Sydney.lon,
				null,
				'imperial'
			).as('imperial');

			cy.get('@imperial')
				.its('body')
				.its('current')
				.its('temp')
				.as('imperial_temp');
			cy.get('@imperial')
				.its('body')
				.its('current')
				.its('wind_speed')
				.as('imperial_wind_speed');
		});
	});

	describe('Temperature', function () {
		it('Standard - Temperature in Kelvin', function () {
			const lowerAcceptableTempInKelvin = 273.15;
			const higherAcceptableTempInKelvin = 323.15;

			expect(this.standard_temp).to.be.within(
				lowerAcceptableTempInKelvin,
				higherAcceptableTempInKelvin
			);
		});

		it('Metric - Temperature in Celcius ', function () {
			const lowerAcceptableTempInCelcius = 0;
			const higherAcceptableTempInCelcius = 50;

			expect(this.metric_temp).to.be.within(
				lowerAcceptableTempInCelcius,
				higherAcceptableTempInCelcius
			);
		});

		it('Imperial - Temperature in Fahrenheit ', function () {
			const lowerAcceptableTempInFahrenheit = 32.0;
			const higherAcceptableTempInFahrenheit = 122.0;

			expect(this.imperial_temp).to.be.within(
				lowerAcceptableTempInFahrenheit,
				higherAcceptableTempInFahrenheit
			);
		});
	});

	describe('Wind Speed', function () {
		it('Standard and Metric - Wind Speed in meter/sec', function () {
			expect(this.standard_wind_speed).to.eq(this.metric_wind_speed);
		});

		it('Imperial - Wind Speed in miles/hour ', function () {
			expect(this.imperial_wind_speed).to.not.eq(this.standard_wind_speed);
			expect(this.imperial_wind_speed).to.not.eq(this.metric_wind_speed);
		});
	});
});
