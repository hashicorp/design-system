/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';

import DocTokensListItem from 'website/components/doc/tokens-list/item';
import type { DocTokensListItemSignature } from 'website/components/doc/tokens-list/item';

interface DocTokensListGridSignature {
  Args: {
    categoryName: string;
    categoryTokens: Array<DocTokensListItemSignature['Args']['token']>;
  };
}

const DocTokensListGrid: TemplateOnlyComponent<DocTokensListGridSignature> =
  <template>
    {{#if @categoryTokens}}
      <h2 class="doc-text-h4">{{capitalize @categoryName}}</h2>
      <ul class="doc-tokens-list" role="list">
        {{#each @categoryTokens as |token|}}
          <DocTokensListItem @token={{token}} />
        {{/each}}
      </ul>
    {{/if}}s
  </template>;

export default DocTokensListGrid;
