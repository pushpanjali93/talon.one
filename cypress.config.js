const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const environment = process.env.ENVIRONMENT || 'production';
      config.env.environment = environment;
      config.env.isProduction = environment === 'production';
      switch (environment) {
        case 'qa':
          config.baseUrl = '';
          break;
        case 'staging':
          config.baseUrl = '';
          break;
        case 'production':
          config.baseUrl = 'https://www.demoblaze.com/';
          break;
      }
      require('cypress-grep/src/plugin')(config);
      return config;
    },
    scrollBehavior: false,
    baseUrl: 'https://www.demoblaze.com/',
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
  },
  //Retry again if any test cases fail.
  retries:0,
 // Capture the screenshots of the particular page where failure occurs.
  screenshotOnRunFailure:true,
  //clear all the saved videos,screenshot and downloads before run.
  trashAssetsBeforeRuns: true,
   // Setting video recording on.
   video: true,
   // generating reports if test case fail.
   reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/reports/results-[hash].xml', 
    toConsole: true,
  },
});
