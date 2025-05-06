import eslint from '@eslint/js';
import tslint from 'typescript-eslint';

export default tslint.config([
  ...tslint.configs.recommended,
  eslint.configs.recommended,
  {
    rules: {
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-namespace': 'off',
    },
    ignores: ['node_modules', 'dist', 'db'],
  },
]);
