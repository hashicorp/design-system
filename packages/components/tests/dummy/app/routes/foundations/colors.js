import Route from '@ember/routing/route';

import TOKENS_RAW from '../../node_modules/@hashicorp/design-system-tokens/dist/docs/products/tokens.json';

export default class FoundationsColorsRoute extends Route {
  model() {
    return { TOKENS_RAW };
  }
}
