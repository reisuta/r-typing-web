import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import * as parserVue from 'vue-eslint-parser'
import * as parserTypeScript from '@typescript-eslint/parser'
import pluginTypeScript from '@typescript-eslint/eslint-plugin'

export default [
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: parserTypeScript,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        $fetch: 'readonly',
        defineNuxtConfig: 'readonly',
        defineNuxtPlugin: 'readonly',
        defineEventHandler: 'readonly',
        navigateTo: 'readonly',
        useRuntimeConfig: 'readonly',
        useState: 'readonly',
        useRoute: 'readonly',
        useRouter: 'readonly',
        useFetch: 'readonly',
        useAsyncData: 'readonly',
        useLazyFetch: 'readonly',
        useLazyAsyncData: 'readonly',
        useNuxtData: 'readonly',
        refreshNuxtData: 'readonly',
        clearNuxtData: 'readonly',
        useError: 'readonly',
        createError: 'readonly',
        definePageMeta: 'readonly',
        useHead: 'readonly',
        useSeoMeta: 'readonly',
        useServerSeoMeta: 'readonly',
        useCookie: 'readonly',
        refreshCookie: 'readonly',
        useRequestHeaders: 'readonly',
        useRequestEvent: 'readonly',
        setResponseStatus: 'readonly',
        setPageLayout: 'readonly',
        process: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': pluginTypeScript,
    },
    rules: {
      // Vue specific rules
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/html-self-closing': ['error', {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      }],
      
      // TypeScript specific rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      
      // General rules
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'comma-dangle': ['error', 'always-multiline'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'indent': ['error', 2],
      'space-before-function-paren': ['error', 'always'],
      'no-undef': 'off', // TypeScript handles this
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.nuxt/**',
      'dist/**',
      'coverage/**',
      '*.d.ts',
      '.output/**',
    ],
  },
]