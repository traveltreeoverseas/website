import { FlatCompat } from '@eslint/eslintrc';
import nextVitals from 'eslint-config-next/core-web-vitals.js';
import nextTs from 'eslint-config-next/typescript.js';

const compat = new FlatCompat();

const eslintConfig = [
  ...compat.extends('next/core-web-vitals'),
  ...nextVitals,
  ...nextTs,
  {
    // Override default ignores of eslint-config-next.
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
