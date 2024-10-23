

// @see https://en.wikipedia.org/wiki/Cyclomatic_complexity
const MAX_CYCLOMATIC_COMPLEXITY = 10;

module.exports = {
  root: true,

  env: {
    node: true,
    es2022: true,
  },

  ignorePatterns: ['.yarn/', '@types/', 'lib', '!.*.*'],
  overrides: [
    {
      files: ['*.js', '*.cjs'],
      extends: ['eslint:recommended'],
      parserOptions: {
        sourceType: 'module',
      },
    },
  ],
  rules: {
    complexity: ['warn', MAX_CYCLOMATIC_COMPLEXITY],
    'consistent-return': 'error',
    eqeqeq: 'error',
    'no-console': 'error',
    'no-else-return': 'error',
    'no-unused-expressions': 'warn',
    'no-use-before-define': 'warn',
    'prefer-const': 'error',
    quotes: [2, 'single', { avoidEscape: true }],
    strict: ['error', 'global'],
  },
};
