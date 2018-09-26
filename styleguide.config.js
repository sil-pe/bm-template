/**
 * For full reference of config see:
 * https://react-styleguidist.js.org/docs/configuration.html
 */

'use strict';

require('ts-node/register');
require('tsconfig-paths/register');
const merge = require('webpack-merge');

const STYLEGUIDE_PATH = './src/components/_styleguide';
const WebpackStyleguidist = merge(require('./webpack/seriesplayer.config.js')(true), {
  entry: {
    index: ['./src/index.tsx'],
    vendor: ['./vendor']
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
});

module.exports = {
  ignore: ['**/*.spec.ts?(x)'],
  styleguideDir: `${STYLEGUIDE_PATH}/dist`,
  webpackConfig: WebpackStyleguidist,
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  skipComponentsWithoutExample: true,
  sections: [
    {
      name: 'Introduction',
      content: `${STYLEGUIDE_PATH}/introduction.md`,
      sections: [
        {
          name: 'Color System',
          content: `${STYLEGUIDE_PATH}/colorSystem.md`
        },
        {
          name: 'Dimensions',
          content: `${STYLEGUIDE_PATH}/dimensions.md`
        },
        {
          name: 'Fonts',
          content: `${STYLEGUIDE_PATH}/fonts.md`
        },
        {
          name: 'Icons',
          content: `${STYLEGUIDE_PATH}/icons.md`
        },
        {
          name: 'Responsiveness',
          content: `${STYLEGUIDE_PATH}/responsiveness.md`
        }
      ]
    },
    {
      name: 'Components',
      components: './src/components/**/*.tsx',
      sections: [
        {
          name: 'Basic-Shape',
          content: './src/components/BasicShape/BasicShape.md'
        }
      ]
    },
    {
      name: 'SeriesPlayer Components',
      components: './src/apps/seriesplayer/components/**/*.tsx'
    }
  ],
  template: {
    head: {
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1.0'}
      ],
      script: [
        {type: 'text/javascript', src: 'https://cdnjs.cloudflare.com/ajax/libs/core-js/2.5.1/core.min.js'}
      ],
      links: [
        {
          type: 'text/css',
          rel: 'stylesheet',
          href: 'dist/assets/css/reset-and-fonts.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Roboto'
        }
      ]
    },
    body: {
      class: 'bm-font',
      div: [
        {id: 'app'},
        {
          id: 'bm-font-measure', style: 'height: 0; width: 0; overflow: hidden',
          span: [
            {style: 'font-weight: bold', content: 'b'},
            {style: 'font-weight: italic', content: 'i'},
            {style: 'font-weight: bold; font-weight: italic', content: 'bi'}
          ]
        }
      ]
    }
  },
  assetsDir: STYLEGUIDE_PATH,
  theme: {
    color: {
      base: '#333333'
    },
    fontFamily: {
      base: ['Noto Sans Symbols', 'Roboto', 'sans-serif']
    }
  },
  styles: {
    Playground: {
      preview: {
        color: '#333333'
      }
    },
    Markdown: {
      th: {
        backgroundColor: 'white'
      },
      tr: {
        '&:nth-child(odd)': {
          backgroundColor: '#E9E9E9'
        }
      }
    }
  },
  propsParser: require('react-docgen-typescript').withDefaultConfig().parse
};


