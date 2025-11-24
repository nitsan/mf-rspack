import { createConfig } from '@nx/angular-rspack';
import baseWebpackConfig from './webpack.config';
import webpackMerge from 'webpack-merge';

export default async () => {
  const baseConfig = await createConfig(
    {
      options: {
        root: __dirname,

        outputPath: {
          base: '../../dist/apps/guides',
          browser: '../../dist/apps/guides',
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
          port: 4201,
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
              maximumError: '1mb',
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
  const mergedConfig = webpackMerge(baseConfig[0], baseWebpackConfig);
  
  // Add module rule for .mjs files in @next-insurance
  if (!mergedConfig.module) {
    mergedConfig.module = {};
  }
  if (!mergedConfig.module.rules) {
    mergedConfig.module.rules = [];
  }
  mergedConfig.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules\/@next-insurance/,
    resolve: {
      fullySpecified: false,
    },
  });
  
  return mergedConfig;
};
