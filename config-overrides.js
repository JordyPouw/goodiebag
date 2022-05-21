const path = require('path');

module.exports = {
  webpack: function (config, env) {
    require('react-app-rewire-postcss')(config, {
      config: {
        path: path.resolve(__dirname, 'postcss.config.js'),
      },
    });

    return config;
  },
};
