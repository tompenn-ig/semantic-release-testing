// we don't need to install vite here, so we can disable this rule
// eslint-disable-next-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { UserConfigExport as BuildConfig, defineConfig, loadEnv } from 'vite';
import cssInject from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';
import { UserConfigExport as DevConfig } from 'vitest/config';

import packageJson from './package.json';

const commonConfig = {
  resolve: {
    alias: {
      '~/assets': resolve(__dirname, 'src/theme/assets'),
      '~/styles': resolve(__dirname, 'src/theme/styles'),
      '~/decorators': resolve(__dirname, '.storybook/decorators'),
    },
  },
};

const devConfig = {
  ...commonConfig,
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/testSetup.ts',
    coverage: {
      provider: 'istanbul',
      reporter: ['json', 'json-summary'],
      reportsDirectory: './coverage',
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['node_modules/**', 'dist/**', 'build/**'],
    },
  },
} satisfies DevConfig;

const buildConfig: BuildConfig = {
  ...commonConfig,
  plugins: [dts({ insertTypesEntry: true, outDir: 'lib', rollupTypes: true }), cssInject(), react()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ig-arcade-common',
      // the proper extensions will be added
      fileName: 'index',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: Object.keys(packageJson.peerDependencies),

      output: {
        dir: 'lib',
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
        },
      },
    },
  },
};

export default defineConfig(({ command, mode }) => {
  // `serve` is running the code locally
  // since the env vars in the frontend-common are process.env we need to target and replace those
  const env = loadEnv(mode, process.cwd(), '');
  const parsedEnv = Object.entries(env).reduce(
    (prev, [key, value]) => {
      return { ...prev, [`process.env.${key}`]: JSON.stringify(value) };
    },
    {} as Record<string, string>,
  );
  if (env.NODE_ENV === 'development') {
    parsedEnv['process.env.DEV'] = JSON.stringify(true);
  }
  return { define: parsedEnv, ...(command === 'serve' ? devConfig : buildConfig) };
});
