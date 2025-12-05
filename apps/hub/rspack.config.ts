import { createConfig } from '@nx/angular-rspack';
import baseWebpackConfig from './webpack.config';
import webpackMerge from 'webpack-merge';

export default async () => {
  const baseConfig = await createConfig(
    {
      options: {
        root: __dirname,

        outputPath: {
          base: '../../dist/apps/hub',
          browser: '../../dist/apps/hub',
        },
        index: './src/index.html',
        browser: './src/main.ts',
        polyfills: ['zone.js'],
        tsConfig: './tsconfig.app.json',
        inlineStyleLanguage: 'scss',
        assets: [
          {
            glob: '**/*',
            input: './public',
          },
        ],
        styles: ['./src/styles.scss'],
        scripts: [],
        devServer: {
          port: 4202,
          publicHost: 'http://localhost:4202',
        },
      },
    },
    {
      production: {
        options: {
          budgets: [
            {
              type: 'initial',
              maximumWarning: '500kb',
              maximumError: '2mb',
            },
            {
              type: 'anyComponentStyle',
              maximumWarning: '4kb',
              maximumError: '8kb',
            },
          ],
          outputHashing: 'all',
          devServer: {},
        },
      },

      development: {
        options: {
          optimization: false,
          vendorChunk: true,
          extractLicenses: false,
          sourceMap: true,
          namedChunks: true,
          devServer: {},
        },
      },
    }
  );
  return webpackMerge(baseConfig[0], baseWebpackConfig);
};
