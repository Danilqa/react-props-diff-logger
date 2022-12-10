module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb-base',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  'settings': {
    'import/resolver': {
      'node': {
        'extensions': [
          '.js',
          '.ts'
        ],
        'paths': [
          './src'
        ]
      }
    }
  },
  rules: {
    'no-shadow': 'off',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ],
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
        'trailingComma': 'none'
      }
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
