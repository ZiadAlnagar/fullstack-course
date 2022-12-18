module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
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
    // 'no-console': 0,
    'consistent-return': 0,
    'no-else-return': [2, { allowElseIf: true }],
  },
  overrides: [
    {
      files: ['*.test.js'],
      rules: {
        'no-undef': 0,
      },
    },
  ],
};
