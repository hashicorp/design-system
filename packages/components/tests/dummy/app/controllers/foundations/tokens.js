import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { restartableTask, timeout } from 'ember-concurrency';

const DEBOUNCE_MS = 250;
export default class TokensController extends Controller {
  queryParams = ['query'];
  @tracked query = null;
  @tracked model;

  get filteredTokens() {
    let query = this.query;
    let tokens = this.model.TOKENS_RAW;

    if (query) {
      return tokens.filter((token) => {
        return (
          token.name.indexOf(query) !== -1 || token.value.indexOf(query) !== -1
        );
      });
    } else {
      return tokens;
    }
  }

  get filteredAndGroupedTokens() {
    const filteredAndGroupedTokens = {};

    this.filteredTokens.forEach((token) => {
      const category = token.attributes.category;
      if (!filteredAndGroupedTokens[category]) {
        filteredAndGroupedTokens[category] = [];
      }

      filteredAndGroupedTokens[category].push(token);
    });

    return filteredAndGroupedTokens;
  }

  @restartableTask *searchTokens(query) {
    yield timeout(DEBOUNCE_MS);

    this.query = query;

    return this.filteredAndGroupedTokens;
  }
}
