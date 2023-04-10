import type { Config } from 'jest';

const config: Config = {
  displayName: 'baseConfig',
  testEnvironment: 'jest-environment-jsdom',

  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs,ts,tsx}',
    '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs,ts,tsx}',
  ],
  moduleNameMapper: {
    '^@[/](.+)': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    // '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$'],
  // moduleDirectories: paths.resolveModules,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'node', 'mjs'],
};

export default config;
