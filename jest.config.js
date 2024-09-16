// jest.config.js
module.exports = {
    preset: 'ts-jest', // Use ts-jest for TypeScript files
    testEnvironment: 'jsdom', // or 'node' if not testing React components
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files using ts-jest
      '^.+\\.(js|jsx|mjs)$': 'babel-jest', // Transform JavaScript files using babel-jest
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(axios)/)', // Ignore all node_modules except axios
    ],
  };
  