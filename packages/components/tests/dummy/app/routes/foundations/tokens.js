import Route from '@ember/routing/route';

import TOKENS_RAW from '../../node_modules/@hashicorp/design-system-tokens/docs/products/tokens.json';

export default class FoundationsTokensRoute extends Route {
  model() {
    return { TOKENS_RAW };
  }
}
