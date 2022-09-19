const { defineConfig } = require('cypress');

module.exports = defineConfig({
  component: {
    setupNodeEvents(on, config) {},
    specPattern: 'src/**/*.spec.js',
  },

  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
});
