# apiTestOpenWeatherMap

Framework created to test the api call from OpenWeatherMap One Call 3.0 https://openweathermap.org/api/one-call-3

The framewoek is not supposed to test if the data returns a rainy or sunny day as there's no soure of thuth for current and forecast weather.

This framework is intended to test the data values that the call returns as well as the features the call offers e.g. the ability to exclude some parts of the data just by passing a which part to remove on the url call.

That being said, there are a lot of different types of data that returns from this call so for the purpose of this framework, we will be using just a sample of those data to test.

### Getting started

Clone this repository on your favorite IDE:
```
git clone https://github.com/rodrigovolkmer/apiTestOpenWeatherMap.git
```
and install:
```
npm install
```

### Run Commands

This framework supports head mode, headless and CI/CD runs:
* If running the commands below give you a `Cypress not installed` error, please run the command `npx cypress install` 
#### Head mode
```
npm test
```
The command above will open Cypress. Once the browser of your choice is selected, a list of test will be presented.

### Headless and CI/CD
```
npm run headless
or 
npm run ci-cd
```
The command above run Cypress on headless mode and run the tests on the command line. The only difference is that the CI/CD will produce Junit reports that the server will read and produce UI reports for the runs.
Reports will be saved on the folder `cypress/results/test-results-[hash].xml`

### Framwork Structure

#### Fixtures data for Latitude and Longitude
Using the webside https://www.latlong.net/
I've constructed the fixture's file with cities around Australia to use on the tests.

#### Custom Commands
The call to the API Get has been created on a custom command so it can be easily accessible on all files.
`latitude` and `longitute` are required. The `exclude` and `units` are optional, with `null` and `standard` as being the default on the call.

It returns the response if the call succeded (200)
```
Cypress.Commands.add('apiCallOpenWeatherMap', (latitude, longitute, exclude = null, units = 'standard' ) => {
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
    expect(response.status).to.eq(200);
    return response;
  });
});
```

#### Page Objects
There was no need to create Page Objects for this Framework as there's no page or elements to test on.
