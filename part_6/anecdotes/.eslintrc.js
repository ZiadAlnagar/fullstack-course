module.exports = {
  env: {
    'browser': true,
    'es2021': true,
    'jest/globals': true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react', 'jest'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'quote-props': [2, 'consistent-as-needed'],
    'no-use-before-define': 0,
    'no-alert': 0,
    'no-return-assign': [2, 'except-parens'],
    'no-param-reassign': 0,
    'no-unused-expressions': [2, { allowShortCircuit: true, allowTernary: true }],
    'no-unused-vars': 0,
    'default-param-last': 0,
    'jsx-quotes': [2, 'prefer-single'],
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
  },
};
