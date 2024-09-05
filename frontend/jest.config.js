export default {
    testEnvironment: 'jest-environment-jsdom', // Specify jsdom environment
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Use babel-jest to transform JavaScript/JSX files
    },
    moduleFileExtensions: ['js', 'jsx']
  };
