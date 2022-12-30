module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-unused-vars': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'no-return-assign': 0,
    'consistent-return': 0,
    'no-else-return': [2, { allowElseIf: true }],
    // 'no-console': 0,
  },
  overrides: [],
};
