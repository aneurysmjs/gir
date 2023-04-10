import type { Config } from 'jest';

import baseConfig from '../../jest.base.config';

const config: Config = {
  ...baseConfig,
  displayName: 'dashboard',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.css$': '<rootDir>/../../config/jest/cssTransform.js',
  },
};

export default config;
