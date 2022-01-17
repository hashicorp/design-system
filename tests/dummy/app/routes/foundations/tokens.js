import Route from '@ember/routing/route';

import TOKENSJSON from '@hashicorp/design-system-tokens/docs/products/tokens.json';

export default class FoundationsElevationRoute extends Route {
  model() {
    const TOKENSLIST = TOKENSJSON.map((token) => {
      return {
        name: token.name,
        value: token.value,
        category: token.attributes.category,
        original_value: token.original.value,
        searchable: `${token.name} ${token.value}`,
        comment: token?.documentation?.comment
          ? token.documentation.comment
          : false,
        isAlias:
          token.original &&
          token.original.value !== token.value &&
          token.original.value.includes('{'),
        isColor: token.value.startsWith('#') || token.value.startsWith('rgb'),
        isDeprecated: token.deprecated,
      };
    });

    return { TOKENSLIST };
  }
}
