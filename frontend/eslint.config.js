import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['dist/**'] },
  js.configs.recommended,
  { files: ['src/**/*.{js,jsx,mjs}'], languageOptions: {
    globals: globals.browser, parserOptions: { ecmaFeatures: { jsx: true } },
  }, rules: { 'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z]' }] } },
  { files: ['tests/**/*.js', '*.config.js'], languageOptions: { globals: globals.node } },
];
