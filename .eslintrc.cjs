/**
 * @see https://github.com/import-js/eslint-plugin-import/issues/1174
 */
const path = require('node:path');
const fs = require('node:fs');

const PACKAGE_DIR = 'packages'; // this could be replaced utilizing the globs in package.json's "workspaces" or from the lerna.json config
// get files in packages
const packages = fs
  .readdirSync(path.resolve(__dirname, PACKAGE_DIR))
  // filter for non-hidden dirs to get a list of packages
  .filter(
    (entry) =>
      entry.substring(0, 1) !== '.' && fs.lstatSync(path.resolve(packages, entry)).isDirectory(),
  );

console.log('pkgs', pkgs);

const noExtraneousOverrides = packages
  // map to override rules pointing to local and root package.json for rule
  .map((entry) => ({
    files: [`${PACKAGE_DIR}${entry}/**/*`],
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false,
          packageDir: [__dirname, path.resolve(__dirname, PACKAGE_DIR, entry)],
        },
      ],
    },
  }));

const importResolverProjects = packages.map((pkg) => path.resolve(packages, pkg, 'tsconfig.json'));

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    // "prettier/@typescript-eslint",
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:jest/recommended',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'import', 'jest'],
  settings: {
    react: {
      version: 'detect',
    },

    'import/resolver': {
      typescript: {
        /**
         * @see https://github.com/import-js/eslint-plugin-import/issues/2301
         */
        project: ['tsconfig.json', ...importResolverProjects],
      },
    },
  },
  rules: {
    indent: 'off',
    'no-restricted-exports': 'off',
    /* @typescript-eslint */
    // Eslint's `indent` rule and Prettier's indentation styles do not match
    // they're completely separate implementations
    // see @link https://github.com/eslint/eslint/issues/10930
    '@typescript-eslint/indent': 'off',
    /* import */
    'import/extensions': 'off',
    /* react-hooks */
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    /* react */
    'react/jsx-uses-vars': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    /**
     * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md#options
     * @see https://github.com/airbnb/javascript/blob/f0df3a8680479ff0b897cd98a1eab6b156899214/packages/eslint-config-airbnb-base/rules/imports.js#L72-L95
     */
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: __dirname,
        devDependencies: true,
      },
    ],

    'prettier/prettier': ['error', { singleQuote: true }],
  },
  overrides: [
    // ...noExtraneousOverrides
    {
      files: [
        'config/**',
        '.eslintrc.cjs',
        'jest.config.js',
        'postcss.config.js',
        'tailwind.config.js',
      ],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'import/no-dynamic-require': 'off',
        'global-require': 'off',
      },
    },
  ],
};
