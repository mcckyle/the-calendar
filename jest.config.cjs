module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '\\.json$': '<rootDir>/__mocks__/events.json',
    'ci-info': '<rootDir>/__mocks__/ci-info.js', // Mock the ci-info module
  },
  globals: {
    global: {
      window: {}, // Fix for missing 'window' in some test environments
    },
  },
  verbose: true,
  setupFiles: ['<rootDir>/jest.setup.js'],
};
