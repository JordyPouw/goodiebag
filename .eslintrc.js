module.exports = {
  extends: ['react-app', 'react-app/jest'],
  overrides: [
    {
      files: ['hardhat.config.js'],
      globals: { task: true },
    },
    {
      files: ['**/*.stories.js'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
};
