const webpack = require('@nativescript/webpack');

module.exports = (env) => {
  webpack.init(env);

  // Learn how to customize:
  // https://docs.nativescript.org/webpack

  webpack.mergeWebpack({
    resolve: {
      fallback: {
        "url": false,
        "util": false,
        "crypto": false,
        "stream": false,
        "buffer": false
      }
    }
  });

  return webpack.resolveConfig();
};
