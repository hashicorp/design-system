import Route from '@ember/routing/route';

import TOKENS_RAW from '@hashicorp/design-system-tokens/docs/products/tokens.json';

export default class FoundationsColorsRoute extends Route {
  model() {
    return { TOKENS_RAW };
  }
}
