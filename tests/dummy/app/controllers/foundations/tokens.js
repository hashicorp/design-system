import Controller from '@ember/controller';

export default class TokensController extends Controller {
  get tokensList() {
    const tokensList = {};

    this.model.TOKENSJSON.forEach((token) => {
      const category = token.attributes.category;
      if (!tokensList[category]) {
        tokensList[category] = [];
      }

      tokensList[category].push({
        name: token.name,
        value: token.value,
        original_value: token.original.value,
        // type: token.type,
        // group: token.group,
        comment: token?.documentation?.comment
          ? token.documentation.comment
          : false,
        isAlias:
          token.original &&
          token.original.value !== token.value &&
          token.original.value.includes('{'),
        isColor: token.value.startsWith('#') || token.value.startsWith('rgb'),
        isDeprecated: token.deprecated,
      });
    });

    return tokensList;
  }
}
