import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: '18.3' },
      'import/resolver': {
        alias: {
          map: [
            ['@', './src'],
            ['icons', './src/assets/icons'],
            ['components', './src/components'],
            ['hooks', './src/hooks'],
            ['pages', './src/pages'],
            ['services', './src/services'],
            ['utils', './src/utils'],
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: eslintPluginImport,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...prettierConfig.rules,
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          semi: true,
          printWidth: 80,
          trailingComma: 'es5',
          jsxSingleQuote: false,
          arrowParens: 'always',
        },
      ],
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^React$',
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'unknown',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
      'react/jsx-curly-newline': [
        'error',
        {
          multiline: 'consistent',
          singleline: 'consistent',
        },
      ],
      'react/jsx-no-duplicate-props': ['error', { ignoreCase: true }],
    },
  },
];
