import { pathsToModuleNameMapper, JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper({
    '@/repositories/*': ['<rootDir>/infrastructure/repositories/*'],
    '@/use-cases/*': ['<rootDir>/infrastructure/use-cases/*'],
    '@/entities/*': ['<rootDir>/domain/entities/*'],
    '@/dtos/*': ['<rootDir>/domain/dtos/*'],
    '@/*': ['<rootDir>/*'],
  }),
};

export default jestConfig;
