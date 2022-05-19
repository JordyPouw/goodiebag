module.exports = {
  extends: [
    "react-app",
    "react-app/jest"
  ],
  overrides: [
    {
      files: ['hardhat.config.js'],
      globals: { task: true },
    },
  ],
};
