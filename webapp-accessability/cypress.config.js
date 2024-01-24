const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://localhost:44412/', // Set the base URL to your front-end application
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
