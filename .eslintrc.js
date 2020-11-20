module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true // TODO: make this only apply to .test.tsx files
  },
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jest'
  ],
  rules: {
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"]
  },
  settings: {
    react: {version: "detect"}
  }
}
