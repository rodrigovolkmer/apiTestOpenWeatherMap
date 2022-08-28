/**
 * ToDo
 * Tests:
 * - Different locations
 * - not excluding anything
 * - excluding daily / hourly / minutely
 * - response content for current and forcast
 * - values presented on the call
 * - units: standard / metric / imperial
 * - timezones
 * - Unix timestamp for date and time
 *
 *
 * Framework Structure:
 * - Cypress 10 - Done
 * - BaseUrl - done
 * - Page Objects - might be an overkill for this example
 * - Dynamic values from Fixture file
 * - API call from custom command
 * - data from fixture files
 * - using alias to reuse the response
 *
 *
 */

describe('OpenWeatherMap API Call', () => {
	/**
	 * Using the webside https://www.latlong.net/
	 * I've constructed the fixture's file with cities around Australia
	 */

	describe('Testing Response Contents', () => {
		beforeEach(() => {
			// from the fixtures file, use Brisbane for this example
			cy.fixture('australiaMajorCities').then(cities => {
				cy.apiCallOpenWeatherMap(cities.Brisbane.lat, cities.Brisbane.lon).as(
					'response'
				);
			});
		});

		it('Should return 200 - OK', function () {
			expect(this.response.status).to.eq(200);
			expect(this.response.statusText).to.eq('OK');
			expect(this.response.isOkStatusCode).to.eq(true);
			expect(this.response).to.have.property('headers');
			expect(this.response).to.have.property('body');
			expect(this.response).to.have.property('duration');
		});

		it('Response should be in Json format', function () {
			cy.wrap(this.response)
				.its('headers')
				.its('content-type')
				.should('include', 'application/json');
		});

		it('Response contains Current weather as well as Daily, Hourly and Minutely Forcasts', function () {
			assert.isObject(this.response.body, 'Response Body is an Object');
			assert.isObject(
				this.response.body.current,
				'Current weather data is an Object'
			);
			assert.isArray(
				this.response.body.minutely,
				'Minute weather data is an Array'
			);
			assert.isArray(
				this.response.body.hourly,
				'Hourly weather data is an Array'
			);
			assert.isArray(
				this.response.body.daily,
				'Daily weather data is an Array'
			);
		});

		it('Response Content - Current Weather Data', function () {
			// information provided
			expect(this.response.body.current).to.have.keys(
				'dt',
				'sunrise',
				'sunset',
				'temp',
				'feels_like',
				'pressure',
				'humidity',
				'dew_point',
				'uvi',
				'clouds',
				'visibility',
				'wind_speed',
				'wind_deg',
				'weather'
			);

			// information provided for Current Weather
			expect(this.response.body.current.weather[0]).to.have.keys(
				'id',
				'main',
				'description',
				'icon'
			);
		});

		it('Response Content - Current Date and Time in Unix Format should match now time', function () {
			const dateNow = new Date();
			const currentDateAndTime = new Date(this.response.body.current.dt * 1000);
			expect(currentDateAndTime.getFullYear()).to.eq(dateNow.getFullYear());
			expect(currentDateAndTime.getMonth()).to.eq(dateNow.getMonth());
			expect(currentDateAndTime.getHours()).to.eq(dateNow.getHours());
			expect(currentDateAndTime.getMinutes()).to.eq(dateNow.getMinutes());
		});
	});
});
