module.exports = {
	env: {
		browser: true,
		es6: true
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module',
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true
		}
	},
	plugins: ['react'],
	// "off"或者0    //关闭规则关闭
	// "warn"或者1    //在打开的规则作为警告（不影响退出代码）
	// "error"或者2    //把规则作为一个错误（退出代码触发时为1）
	rules: {
		'default-case': 'error',
		// 'no-lonely-if': 'error',
		// 'no-else-return': 'error',
		'no-console': 'off',
		'no-empty': 'off',
		'no-undef': 'off',
		indent: ['error', 'tab'],
		// 'no-use-before-define': 'off',
		'no-mixed-spaces-and-tabs': 2,
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		// 'no-unused-vars': ['off', { vars: 'all', args: 'after-used' }],

		// react
		'react/display-name': 0,
		'react/prop-types': 0
	}
	// globals: {}
};
