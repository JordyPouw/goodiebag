module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
  },
  extends: [
    //"standard",
    // "plugin:prettier/recommended",
    // "plugin:node/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  overrides: [
    {
      files: ["hardhat.config.js"],
      globals: { task: true },
    },
  ],
};
