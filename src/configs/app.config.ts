export default () => ({
  app: {
    port: process.env.APP_PORT || 8080,
    appVersion: process.env.APP_VERSION || 8080,
    apiPrefix: process.env.API_PREFIX || 8080,
  },
});
