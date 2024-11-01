import vue from 'eslint-plugin-vue'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import unusedImports from 'eslint-plugin-unused-imports'
import parser from 'vue-eslint-parser'

export default [
  {
    ignores: ['node_modules', 'dist', '.vite', 'out', '.vscode', '.github']
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    languageOptions: {
      parser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 2020,
        sourceType: 'module',
        requireConfigFile: false
      }
    },
    plugins: {
      vue,
      '@typescript-eslint': typescriptPlugin,
      import: importPlugin,
      'unused-imports': unusedImports,
      prettier
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      'vue/no-multiple-template-root': 'off',
      'vue/no-unused-vars': 'warn',
      'vue/multi-word-component-names': 'off',

      'import/order': ['error', { alphabetize: { order: 'asc', caseInsensitive: true } }],
      'unused-imports/no-unused-imports': 'warn',

      'no-console': 'off',
      'no-debugger': 'warn',
      'prettier/prettier': 'warn'
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json'
        }
      }
    }
  },
  eslintConfigPrettier
]
