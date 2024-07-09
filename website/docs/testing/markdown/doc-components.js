/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import TOKENS_RAW from '@hashicorp/design-system-tokens/dist/docs/products/tokens.json';

const ELEVATIONS = ['inset', 'low', 'mid', 'high', 'higher', 'overlay'];

export default class Index extends Component {
  get colors() {
    const colors = {
      semantic: {},
    };

    TOKENS_RAW.forEach((token) => {
      if (token.attributes.category === 'color' && !token.deprecated) {
        if (token.group) {
          if (token.group === 'semantic') {
            const context = token.path[1];
            if (!colors['semantic'][context]) {
              colors['semantic'][context] = [];
            }
            const tokenObj = {
              colorName: `${token.path[1]}-${token.path[2]}`,
              cssVariable: `--${token.name}`,
              value: token.value,
            };
            if (['foreground', 'page', 'surface', 'border'].includes(context)) {
              const name = token.path[2];
              tokenObj.cssHelper = `hds-${context}-${name}`;
            }
            colors['semantic'][context].push(tokenObj);
          }
        } else {
          console.log(
            `Notice: the color ${token.name} is missing the 'group' attribute in the JSON definition.`
          );
        }
      }
    });

    return colors;
  }

  get colorCard() {
    return {
      colorName: 'primary',
      cssVariable: '--color-primary',
      value: '#0069ce',
      cssHelper: 'hds-semantic-primary',
    };
  }

  get fontHelpers() {
    const fontHelpers = {
      styles: [
        {
          previewText: 'Aa',
          previewClass: 'hds-font-weight-regular',
          copyText: 'hds-font-weight-regular',
        },
        {
          previewText: 'Aa',
          previewClass: 'hds-font-weight-medium',
          copyText: 'hds-font-weight-medium',
        },
        {
          previewText: 'Aa',
          previewClass: 'hds-font-weight-semibold',
          copyText: 'hds-font-weight-semibold',
        },
        {
          previewText: 'Aa',
          previewClass: 'hds-font-weight-bold',
          copyText: 'hds-font-weight-bold',
        },
      ],
    };
    return fontHelpers;
  }

  get cssHelpers() {
    const cssHelpers = { elevations: [] };
    ELEVATIONS.forEach((elevation) => {
      cssHelpers.elevations.push(`.hds-elevation-${elevation}`);
    });
    return cssHelpers;
  }

  get tokens() {
    return {
      elevations: [
        {
          value: '0px 2px 3px 0px #656a7626, 0px 16px 16px -10px #656a7633',
          original: {
            value:
              '{elevation.high.box-shadow-01.value}, {elevation.high.box-shadow-02.value}',
          },
          name: 'token-elevation-high-box-shadow',
          attributes: {
            category: 'elevation',
            type: 'high',
            item: 'box-shadow',
          },
          path: ['elevation', 'high', 'box-shadow'],
        },
        {
          value: '0px 2px 3px 0px #656a761a, 0px 12px 28px 0px #656a7640',
          original: {
            value:
              '{elevation.higher.box-shadow-01.value}, {elevation.higher.box-shadow-02.value}',
          },
          name: 'token-elevation-higher-box-shadow',
          attributes: {
            category: 'elevation',
            type: 'higher',
            item: 'box-shadow',
          },
          path: ['elevation', 'higher', 'box-shadow'],
        },
        {
          value: 'inset 0px 1px 2px 1px #656a761a',
          original: {
            value: '{elevation.inset.box-shadow-01.value}',
          },
          name: 'token-elevation-inset-box-shadow',
          attributes: {
            category: 'elevation',
            type: 'inset',
            item: 'box-shadow',
          },
          path: ['elevation', 'inset', 'box-shadow'],
        },
      ],
    };
  }

  get title() {
    return 'Related Components';
  }

  get relatedComponents() {
    return [
      {
        image: '/assets/illustrations/components/reveal.jpg',
        title: 'Reveal',
        caption:
          'A toggle that reveals additional content to the user when triggered.',
        route: 'show',
        model: 'components/reveal',
      },
      {
        image: '/assets/illustrations/components/flyout.jpg',
        title: 'Flyout',
        caption:
          'Displays additional details and information about an item or object, overlaid on the main page content.',
        route: 'show',
        model: 'components/flyout',
      },
      {
        image: '/assets/illustrations/components/modal.jpg',
        title: 'Modal',
        caption:
          'A pop-up window used to request information, confirm a decision, or provide additional context.',
        route: 'show',
        model: 'components/modal',
      },
      {
        image: '/assets/illustrations/components/tabs.jpg',
        title: 'Tabs',
        caption:
          'Allows users to move among different views within the same context.',
        route: 'show',
        model: 'components/tabs',
      },
    ];
  }

  get card() {
    return this.relatedComponents[0];
  }
}
