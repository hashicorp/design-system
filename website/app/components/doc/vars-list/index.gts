/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import DocCopyButton from 'website/components/doc/copy-button';

interface DocVarsListSignature {
  Args: {
    items: string[];
  };
}

const DocVarsList: TemplateOnlyComponent<DocVarsListSignature> = <template>
  <ul class="doc-vars-list" role="list">
    {{#each @items as |item|}}
      <li class="doc-vars-list__item">
        <DocCopyButton @textToCopy={{item}} @type="ghost" />
      </li>
    {{/each}}
  </ul>
</template>;

export default DocVarsList;
