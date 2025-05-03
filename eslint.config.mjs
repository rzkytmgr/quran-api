import eslint from '@eslint/js';
import tslint from 'typescript-eslint';

export default tslint.config([
  ...tslint.configs.recommended,
  eslint.configs.recommended,
  {
    rules: {},
    ignores: ['node_modules', 'dist', 'db'],
  },
]);
