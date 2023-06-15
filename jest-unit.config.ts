import type { Config } from 'jest';

import defaultConfig from './jest.config';

const config: Config = {
  ...defaultConfig,
  displayName: 'unit-test',
  roots: ['<rootDir>/test/unit'],
  testPathIgnorePatterns: ['/e2e/'],
};

export default config;
