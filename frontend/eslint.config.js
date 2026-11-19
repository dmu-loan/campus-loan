import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['dist/**', 'public/vendor/**'] },
  js.configs.recommended,
  {
    files: ['public/*.js'],
    languageOptions: {
      sourceType: 'script',
      globals: { ...globals.browser, ...Object.fromEntries(
        '$ app modal esc fmt pair btn check opt popup notice api report field select faqSections Chart'.split(' ').map(name => [name, 'readonly'])
      ) },
    },
    rules: { 'no-redeclare': ['error', { builtinGlobals: false }], 'no-unused-vars': ['error', { vars: 'local', args: 'none', caughtErrors: 'none' }] },
  },
  { files: ['src/**/*.js'], languageOptions: { globals: globals.browser } },
  { files: ['tests/**/*.js', '*.config.js'], languageOptions: { globals: globals.node } },
];
