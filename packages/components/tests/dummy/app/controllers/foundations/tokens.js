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

  // TODO! triggers an error in the console:
  // Uncaught Error: Assertion Failed: The first argument passed to the `perform` helper should be a Task object (without quotes); you passed undefined
  @restartableTask *searchTokens(query) {
    yield timeout(DEBOUNCE_MS);

    // TODO: WHY DO WE NEED THIS?
    // see https://github.com/hashicorp/flight/pull/358/files#r774693667
    this.query = query;

    return this.filteredAndGroupedTokens;
  }
}
