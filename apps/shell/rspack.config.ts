import { createConfig } from '@nx/angular-rspack';
import { withModuleFederation } from '@nx/module-federation/angular';
import baseMfConfig from './module-federation.config';
import baseWebpackConfig from './webpack.config';
import webpackMerge from 'webpack-merge';

export default async (env: any, argv: any) => {
  const rspackConfig = await createConfig(
    {
      options: {
        root: __dirname,

        outputPath: {
          base: '../../dist/apps/shell',
          browser: '../../dist/apps/shell',
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
          port: 4200,
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

  // In production, override remotes to use relative paths for Docker deployment
  // This replaces the remotes configuration from webpack.prod.config.ts
  // Check multiple ways to determine production mode
  const mode = env?.mode || argv?.mode || process.env['NODE_ENV'] || 'development';
  const isProduction = mode === 'production';
  
  // In development, use baseWebpackConfig which has the standard remotes
  // In production, use withModuleFederation helper (similar to webpack.prod.config.ts)
  if (isProduction) {
    // Create module federation config with production remotes using withModuleFederation
    // This matches the approach used in webpack.prod.config.ts
    const productionMfConfig = withModuleFederation(
      {
        ...baseMfConfig,
        /*
         * Remote overrides for production.
         * Each entry is a pair of a unique name and the URL where it is deployed.
         */
        remotes: [
          ['hub', '/hub'],
          ['guides', '/guides'],
        ],
      },
      { dts: false }
    );

    return webpackMerge(rspackConfig[0], productionMfConfig);
  }

  // Development: use base webpack config
  return webpackMerge(rspackConfig[0], baseWebpackConfig);
};
