const js = require('@eslint/js');
const angular = require('angular-eslint');
const typescript = require('@typescript-eslint/eslint-plugin');
const prettier = require('eslint-config-prettier');

const typescriptFiles = ['**/*.ts'];
const templateFiles = ['**/*.html'];

const scopeToFiles = (configs, files) => configs.map((config) => ({ ...config, files }));

module.exports = [
    {
        ignores: ['**/dist/**']
    },
    {
        files: ['**/*.js'],
        languageOptions: {
            parserOptions: {
                allowImportExportEverywhere: true
            }
        }
    },
    {
        ...js.configs.recommended,
        files: typescriptFiles
    },
    ...scopeToFiles(typescript.configs['flat/recommended'], typescriptFiles),
    ...scopeToFiles(angular.configs.tsRecommended, typescriptFiles),
    {
        files: typescriptFiles,
        languageOptions: {
            parserOptions: {
                project: ['tsconfig.json', 'e2e/tsconfig.json'],
                createDefaultProgram: true
            }
        },
        processor: angular.processInlineTemplates,
        rules: {
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: 'p',
                    style: 'kebab-case'
                }
            ],
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: 'p',
                    style: 'camelCase'
                }
            ],
            '@angular-eslint/component-class-suffix': [
                'error',
                {
                    suffixes: ['']
                }
            ],
            '@angular-eslint/no-host-metadata-property': 'off',
            '@angular-eslint/no-output-on-prefix': 'off',
            '@typescript-eslint/ban-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-inferrable-types': 'off',
            'arrow-body-style': ['error', 'as-needed'],
            curly: 0,
            '@typescript-eslint/member-ordering': [
                'error',
                {
                    default: ['public-static-field', 'static-field', 'instance-field', 'public-instance-method', 'public-static-field']
                }
            ],
            'no-console': 0,
            'prefer-const': 0
        }
    },
    ...scopeToFiles(angular.configs.templateRecommended, templateFiles),
    {
        files: templateFiles,
        rules: {
            '@angular-eslint/template/eqeqeq': [
                'error',
                {
                    allowNullOrUndefined: true
                }
            ]
        }
    },
    {
        rules: {
            'padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
                { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
                { blankLine: 'any', prev: ['case', 'default'], next: 'break' },
                { blankLine: 'any', prev: 'case', next: 'case' },
                { blankLine: 'always', prev: '*', next: 'return' },
                { blankLine: 'always', prev: 'block', next: '*' },
                { blankLine: 'always', prev: '*', next: 'block' },
                { blankLine: 'always', prev: 'block-like', next: '*' },
                { blankLine: 'always', prev: '*', next: 'block-like' },
                { blankLine: 'always', prev: ['import'], next: ['const', 'let', 'var'] }
            ]
        }
    },
    prettier
];
