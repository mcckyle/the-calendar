module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
    "\\.json$": "<rootDir>/__mocks__/events.json",
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom' // This should be the correct import path
  ],
};
