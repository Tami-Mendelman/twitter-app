import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: [
      'src/App.tsx',
      'src/api/index.ts',
      'src/components/{AuthProvider,ProtectedLayout,auth-context,Navbar}.{ts,tsx}',
      'src/functions/{auth,auth-form,auth-session,auth-token,post-form,post-search,profile,protected-layout}.functions.ts',
      'src/pages/{CreatePostPage,LoginPage,ProfilePage,RegisterPage}.tsx',
      'src/styles/{auth,navbar,profile}.styles.ts',
      'src/types/auth.types.ts',
    ],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        { assertionStyle: 'never' },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          modifiers: ['const'],
          format: null,
          custom: {
            regex:
              '^(?:[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*|[a-z][a-zA-Z0-9]*|[A-Z][a-zA-Z0-9]*)$',
            match: true,
          },
        },
      ],
      'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['res'] }],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'VariableDeclaration[kind="let"]',
          message: 'Use const declarations only.',
        },
        {
          selector: 'VariableDeclaration[kind="var"]',
          message: 'Use const declarations only.',
        },
        {
          selector: 'TSInterfaceDeclaration',
          message: 'Use type aliases instead of interfaces.',
        },
        {
          selector: 'FunctionDeclaration',
          message: 'Use arrow functions instead of function declarations.',
        },
        {
          selector:
            'IfStatement:not(:has(> ReturnStatement, > ThrowStatement, > BlockStatement > ReturnStatement, > BlockStatement > ThrowStatement))',
          message: 'Use a ternary expression unless the if returns or throws.',
        },
        {
          selector: 'ConditionalExpression ConditionalExpression',
          message: 'Avoid nested ternary expressions.',
        },
        {
          selector: 'CallExpression > ArrowFunctionExpression',
          message: 'Name callbacks before passing them to functions.',
        },
        {
          selector: 'CallExpression > FunctionExpression',
          message: 'Name callbacks before passing them to functions.',
        },
        {
          selector: 'Property[value.type="ArrowFunctionExpression"]',
          message: 'Name callbacks before assigning them as object properties.',
        },
        {
          selector: 'TryStatement',
          message: 'Handle asynchronous failures with Promise.catch.',
        },
        {
          selector: 'CallExpression[callee.property.name="then"]',
          message: 'Use async/await instead of Promise.then.',
        },
        {
          selector: 'JSXAttribute[name.name="style"]',
          message: 'Use JSS classes instead of inline styles.',
        },
        {
          selector:
            'CallExpression[callee.property.name=/^(map|filter|reduce|forEach)$/]',
          message: 'Use lodash/fp instead of native array iteration methods.',
        },
      ],
    },
  },
])
