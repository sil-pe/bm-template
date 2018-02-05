/**
 * For full reference of config see:
 * https://react-styleguidist.js.org/docs/configuration.html
 */

'use strict';

const STYLEGUIDE_PATH = './src/components/_styleguide';
const COMPONENTS_PATH = './src/components';

module.exports = {
  ignore: ['**/*.spec.ts?(x)'],
  styleguideDir: `${STYLEGUIDE_PATH}/dist`,
  resolver: require('react-docgen').resolver.findAllComponentDefinitions,
  skipComponentsWithoutExample: true,
  sections: [
    {
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
        }
      ]
    },
    {
      name: 'Components',
      components: './src/components/**/*.tsx'
    }
  ],
  template: './src/templates/index_styleguide.html',
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
  }
};


