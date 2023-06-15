import type { Config } from 'jest';

import defaultConfig from './jest.config';
//import { resolve } from 'path';

const config: Config = {
  ...defaultConfig,
  testTimeout: 20000,
  roots: ['<rootDir>/test/e2e'],
  displayName: 'e2e-tests',
  // preset: '@colussi/jest-testcontainers-mysql',
  //globalSetup: resolve(__dirname, './test/helper/connection-db.ts'),
  //globalTeardown: resolve(__dirname, './test/helper/tear-down-db.ts'),
  setupFilesAfterEnv: ['<rootDir>/test/hook/jest-setup.ts'],
};

export default config;
