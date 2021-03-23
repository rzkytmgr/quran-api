module.exports = {
	env: {
		commonjs: true,
		es2021: true,
		node: true,
	},
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	rules: {
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'never',
				named: 'never',
				asyncArrow: 'always',
			},
		],
		'arrow-body-style': ['error', 'as-needed'],
		'no-var': 'error',
		'space-before-blocks': ['error', 'always'],
		'keyword-spacing': ['error', { before: true, after: true }],
		indent: ['error', 'tab'],
		semi: ['error', 'always'],
		quotes: ['error', 'single'],
		'no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }],
		'key-spacing': ['error', { afterColon: true }],
	},
};
