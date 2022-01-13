import Route from '@ember/routing/route';

import TOKENSJSON from '@hashicorp/design-system-tokens/docs/products/tokens.json';

export default class FoundationsElevationRoute extends Route {
  model() {
    return { TOKENSJSON };
  }
}
