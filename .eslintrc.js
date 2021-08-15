module.exports = {
  'env': {
      'node': true,
      'commonjs': true,
      'es2021': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
      'ecmaVersion': 12
  },
  'rules': {
      'semi': ['warn', 'always'],
      'quotes': ['warn', 'single']
  }
};
