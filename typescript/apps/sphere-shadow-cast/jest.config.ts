import type {Config} from 'jest';

const jestConfig = async (): Promise<Config> => {
  return {
    // verbose: true,
    transform: {
      '^.+\\.(t|j)sx?$': '@swc/jest',
    },
  };
};

export default jestConfig;
