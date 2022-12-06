import Component from '@glimmer/component';

import TOKENS_RAW from '@hashicorp/design-system-tokens/dist/docs/products/tokens.json';

export default class Index extends Component {
  get groupedTokens() {
    const groupedTokens = {};

    TOKENS_RAW.forEach((token) => {
      const category = token.attributes.category;
      if (!groupedTokens[category]) {
        groupedTokens[category] = [];
      }

      groupedTokens[category].push(token);
    });

    return groupedTokens;
  }
}
