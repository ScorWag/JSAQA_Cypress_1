const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 768,
  viewportWidth: 1366,
  e2e: {
    baseUrl: "http://localhost:3000/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
