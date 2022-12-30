module.exports = {
  env: {
    'browser': true,
    'es2021': true,
    'jest/globals': true,
    'cypress/globals': true,
    // 'jest': true,
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
  plugins: ['react', 'jest', 'cypress'],
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
    'no-unused-expressions': [2, {
      allowShortCircuit: true,
      allowTernary: true,
    }],
    'jsx-quotes': [0, 'prefer-single'],
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/function-component-definition': [2, {
      namedComponents: 'arrow-function',
    }],
  },
};

// 'no-console': 0,
// 'import/named': 0,
// 'no-unused-vars': 0,
// 'consistent-return': 0,
// 'no-underscore-dangle': 0,
// 'no-else-return': [2, { allowElseIf: true }],
