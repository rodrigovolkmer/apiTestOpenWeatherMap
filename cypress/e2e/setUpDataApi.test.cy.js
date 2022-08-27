import response3 from "../fixtures/response3.json";

/**
	 * ToDo 
	 * Tests:
	 * - Different locations
	 * - not excluding anything 
	 * - excluding daily / hourly / minutely
	 * - response content for current and forcast
	 * - values presented on the call
	 * 
	 * Framework Structure:
	 * - Cypress 10 - Done
	 * - BaseUrl - done
	 * - Page Objects
	 * - Dynamic values
	 */

const Brisbane = {
	lat: -27.469770,
	lon:  153.025131
}

const exclude = '';

describe('E2E Tests', () => {

	/**
	 * Using the webside https://www.latlong.net/
	 * I've constructed the fixture's file with cities around australia
	 */
	
	before(() => {
		cy.fixture('australiaMajorCities').then(cities => {
			cy.apiCallOpenWeatherMap(cities.Brisbane.lat, cities.Brisbane.lon)
			// cy.fixture('response3')
			.as('response')	
		});
	});


	it('OpenWeatherMap API Test', function () {

			// status 200 - OK
			expect(this.response.status).to.eq(200);
			expect(this.response.statusText).to.eq('OK');
			expect(this.response.isOkStatusCode).to.eq(true);
			
			expect('Content-Type', /application\/json/)

			// Latitude and Logitude to match the call 
			// numbers should be rounded to 4 decimal digits 
			// expect(Number(this.response.body.lat)).to.eq(kingscliff.lat.toFixed(4));
			// expect(Number(this.response.body.lon)).to.eq(kingscliff.lon.toFixed(4));

			// response contains daily, hourly and minutely forcasts
			assert.isObject(this.response.body, 'Response Body is an Object')
			assert.isObject(this.response.body.current, 'Current weather data is an Object')
			assert.isArray(this.response.body.minutely, 'Minute weather data is an Array')
			assert.isArray(this.response.body.hourly, 'Hourly weather data is an Array')
			assert.isArray(this.response.body.daily, 'Daily weather data is an Array')

			// go deep into each response content 
			// Current
			// expect(this.response.body.current).to.have.keys('dt', 'sunrise', 'sunset', 'temp')

			// cy.wrap(this.response.body)
			// .should('include', {
			// 	// task: 'run tests',
			// 	// completed: false,
			// });

				console.log((this.response))
			
			// .its('headers')
			// .its('content-type')
			// .should('include', 'application/json') // response should be in Json format
		
	});
});
