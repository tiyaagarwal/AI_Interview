import js from '@eslint/js';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';

export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    plugins: { react, 'react-hooks': hooks },
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        window: 'readonly', document: 'readonly', localStorage: 'readonly', FormData: 'readonly',
        alert: 'readonly', console: 'readonly', setTimeout: 'readonly', clearTimeout: 'readonly'
      }
    },
    rules: { 'react/react-in-jsx-scope': 'off', 'react/jsx-uses-react': 'off', 'react/jsx-uses-vars': 'error', 'react/prop-types': 'off', 'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }] },
    settings: { react: { version: 'detect' } }
  }
];
