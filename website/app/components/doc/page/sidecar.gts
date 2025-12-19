/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { not } from 'ember-truth-helpers';

interface DocPageSidecarSignature {
  Args: {
    tocs: Array<{
      id: string;
      isCurrent: boolean;
      list: Array<{
        depth: number;
        target: string;
        text: string;
      }>;
    }>;
  };
  Element: HTMLDivElement;
}

const DocPageSidecar: TemplateOnlyComponent<DocPageSidecarSignature> =
  <template>
    <div class="doc-page-sidecar" ...attributes>
      <p class="doc-page-sidecar__on-this-page" id="nav-sidecar">On this page:</p>
      {{#each @tocs as |toc|}}
        <ul
          class="doc-page-sidecar__list"
          id={{toc.id}}
          hidden={{not toc.isCurrent}}
          aria-labelledby="nav-sidecar"
        >
          {{#each toc.list as |item|}}
            <li
              class="doc-page-sidecar__item doc-page-sidecar__item--depth-{{item.depth}}"
            >
              <a href="#{{item.target}}">{{item.text}}</a>
            </li>
          {{/each}}
        </ul>
      {{/each}}
    </div>
  </template>;

export default DocPageSidecar;
