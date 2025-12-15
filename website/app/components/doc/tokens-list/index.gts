/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import type { Task } from 'ember-concurrency';

import DocFormFilter from 'website/components/doc/form/filter';
import DocTokensListGrid from 'website/components/doc/tokens-list/grid';
import type { DocTokensListItemSignature } from 'website/components/doc/tokens-list/item';

interface DocTokensListSignature {
  Args: {
    searchQuery: string;
    searchTokens: Task<void, [string]>;
    groupedTokens: Record<
      string,
      Array<DocTokensListItemSignature['Args']['token']>
    >;
  };
  Element: HTMLDivElement;
}

const DocTokensList: TemplateOnlyComponent<DocTokensListSignature> = <template>
  <div class="doc-tokens-list-filter">
    <DocFormFilter
      @label="Filter"
      @placeholder="Type a name or keyword (e.g. red)"
      @filterQuery={{@searchQuery}}
      @onInput={{@searchTokens}}
    />
  </div>

  {{#each-in @groupedTokens as |categoryName categoryTokens|}}
    <DocTokensListGrid
      @categoryName={{categoryName}}
      @categoryTokens={{categoryTokens}}
    />
  {{else}}
    <p class="doc-text-body" data-test-target="no-tokens-found">No tokens found.
      🤷‍♀️</p>
  {{/each-in}}
</template>;

export default DocTokensList;
