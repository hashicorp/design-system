/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import DocCopyButton from 'website/components/doc/copy-button';

interface DocFontHelpersListSignature {
  Args: {
    items: Array<{
      previewClass: string;
      previewText: string;
      copyText?: string;
      otherText?: string;
    }>;
  };
}

const DocFontHelpersList: TemplateOnlyComponent<DocFontHelpersListSignature> =
  <template>
    <ul class="doc-font-helpers-list" role="list">
      {{#each @items as |item|}}
        {{! role="listitem" is needed here because the class sets display: contents and some browsers and assistive technologies will ignore the implied role }}
        <li class="doc-font-helpers-list__item" role="listitem">
          <div
            class="doc-font-helpers-list__preview {{item.previewClass}}"
          >{{item.previewText}}</div>
          <div class="doc-font-helpers-list__content">
            {{#if item.copyText}}
              <DocCopyButton
                @type="code"
                @textToShow=".{{item.copyText}}"
                @textToCopy={{item.copyText}}
              />
            {{/if}}
            {{#if item.otherText}}
              <code
                class="doc-font-helpers-list__simple-code"
              >{{item.otherText}}</code>
            {{/if}}
          </div>
        </li>
      {{/each}}
    </ul>
  </template>;

export default DocFontHelpersList;
