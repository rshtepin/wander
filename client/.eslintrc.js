module.exports = {

  'env': {
    browser: true,
    node: true,
    es6: true,
  },

  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true
    }
  },
  'extends': ['eslint:recommended',
    'google',
    'plugin:react/recommended'
  ],
  'rules': {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'indent': ['error', 2],
    'no-tabs': 0,
    'react/jsx-filename-extension': [1, {'extensions': ['.js', '.jsx']}],

    'semi': ['error', 'never'
    ],
    'comma-dangle': 'off',
    'require-jsdoc': 'off',
    'linebreak-style': 'off',
    'operator-linebreak': 'off',
    'quotes': [
      2, 'single'
    ]
  },
}
