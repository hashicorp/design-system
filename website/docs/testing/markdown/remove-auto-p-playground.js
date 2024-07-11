/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class Index extends Component {
  get varsListDemo() {
    return ['lorem-ipsum'];
  }

  get fontHelpersDemo() {
    return [{ previewText: 'A', copyText: 'lorem-ipsum' }];
  }

  get tokensDemo() {
    return {
      test: [
        {
          name: 'token-color-palette-blue-500',
          value: '#1c345f',
          type: 'color',
          original: {
            value: '#1c345f',
          },
          attributes: {
            category: 'color',
          },
        },
      ],
    };
  }
}
