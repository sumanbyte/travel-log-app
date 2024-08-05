module.exports = {
    // Your webpack configuration
    devServer: {
      setupMiddlewares: (middlewares, devServer) => {
        // Custom middleware setup
        return middlewares;
      },
      // Other devServer options
    },
    // Other configuration options
  };
  