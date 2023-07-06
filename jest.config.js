import { pathsToModuleNameMapper } from 'ts-jest'
import tsconfig from './tsconfig.json' assert { type: 'json' }

export default {
  preset: 'ts-jest',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testMatch: ['<rootDir>/test/**/*.ts'],
  testPathIgnorePatterns: ['.+.d.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageReporters: ['text'],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths)
}
