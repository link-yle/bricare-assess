const { startDevServer } = require('@cypress/vite-dev-server');

module.exports = (on, config) => {
  on('dev-server:start', (options) =>
    startDevServer({
      options,
      viteConfig: {
        configFile: path.resolve(__dirname, '..', '..', 'vite.config.js'),
      },
    })
  );

  return config;
};
