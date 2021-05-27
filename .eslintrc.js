const prettierConfig = require('./.prettierrc.js')

module.exports = {
  extends: [
    // AirBnb
    'airbnb',

    // Typescript
    'plugin:@typescript-eslint/eslint-recommended',
    // enables import rules in typescript files
    'plugin:import/typescript',

    // Prettier
    'plugin:prettier/recommended',

    // Jest
    'plugin:jest/all'
  ],
  env: {
    node: true,
    es6: true,
    jest: true
  },
  globals: {
    React: 'readonly'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    // Airbnb + @typescript-eslint conflicts
    // Replace airbnb 'camel' with '@typescript-eslint' equivalent
    // Ensures consistent argument/variable casing
    camelcase: 'off',
    // Replace airbnb 'no-unused-expressions' with '@typescript-eslint' equivalent
    // Ensures all expressions are used
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': ['error'],
    // Replace airbnb 'no-unused-vars' with '@typescript-eslint' equivalent
    // Ensures all variables are used
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    // Replace airbnb 'no-use-before-define' with '@typescript-eslint' equivalent
    // Enables us to use functions before they are defined
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    // Replace 'no-shadow' with '@typescript-eslint' equivalent
    // Ensures we don't redefine variables
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],

    // @typescript-eslint
    // Allow return statements to have no TS type
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Enforce PascalCase types and interfaces
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'typeLike', format: ['PascalCase'] }
    ],

    // Import rules
    // Allow for a single named export without it being default
    'import/prefer-default-export': 'off',
    // Allow nextJS imports
    'import/no-unresolved': 'off',
    // Group module and relative imports
    'import/order': [
      'error',
      {
        // Imports are grouped as follows:
        groups: [
          // 1: built-in node modules (fs, path)
          'builtin',
          // 2: dependencies in node_modules
          'external',
          // 3: internal aliases. See pathGroups below.
          'internal',
          // 4. relative imports
          'parent',
          // 5. relative imports in the same directory
          'sibling'
        ],
        pathGroups: [
          {
            // @shared imports are classed as 'internal'
            pattern: '@shared/**',
            group: 'internal'
          },
          {
            // @pages imports come after internal
            pattern: '@pages/**',
            group: 'internal',
            position: 'after'
          },
          {
            // @assets imports come after internal
            pattern: '@assets/**',
            group: 'internal',
            position: 'after'
          }
        ],
        // Required for pathGroups to work.
        pathGroupsExcludedImportTypes: ['builtin'],
        // Add an empty line between import groups.
        'newlines-between': 'always'
      }
    ],
    // Prevent import of dependencies not listed in package.json
    'import/no-extraneous-dependencies': [
      'error',
      {
        // Allow importing from devDependencies in...
        devDependencies: [
          '**/**/*.test.{js,ts,tsx}', // ...tests
          '**/tests/*.{js,ts,tsx}' // ...test setup
        ]
      }
    ],
    // Don't requre file type in imports. TS already enforces this.
    'import/extensions': 'never',

    // Jest rules
    // Ensures consistent naming in test declarations
    'jest/lowercase-name': [
      'error',
      {
        // Allow describe block name to be uppercase
        // This is so that we can describe('ComponentName')
        ignore: ['describe']
      }
    ],
    // Allow any expect assertions
    'jest/prefer-expect-assertions': 'off',
    // Allow global beforeAll, beforeEach etc hooks
    'jest/no-hooks': 'off',
    // Allow snapshots in external files
    'jest/prefer-inline-snapshots': 'off',
    // Enforce "it" instead of "test" inside describe blocks
    'jest/consistent-test-it': ['error', { fn: 'it' }],

    // Override no-restricted-syntax to allow for..of loops
    // but keep the other constructs forbidden
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement'
    ],

    // Disable classes per file limitations
    'max-classes-per-file': 'off',

    // Enforce consistent curly braces
    // on flow control
    'curly': ['error', 'multi-line', 'consistent'],

    // prettier rules
    'prettier/prettier': ['error', prettierConfig]
  },
  settings: {
    jest: {
      version: 26
    },
  }
}
