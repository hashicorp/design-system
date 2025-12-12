/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { capitalize } from '@ember/string';
import { fn } from '@ember/helper';
import { on } from '@ember/modifier';

interface Tab {
  id: string;
  label: string;
  target: string;
  isCurrent: boolean;
  onClickTab?: (tab: unknown) => void;
}

interface DocPageTabsSignature {
  Args: {
    tabs: Tab[];
  };
  Element: HTMLUListElement;
}

export default class DocPageTabsComponent extends Component<DocPageTabsSignature> {
  onClickTab = (tab: Tab) => {
    // Invoke the callback function if it's provided as argument
    if (typeof tab.onClickTab === 'function') {
      tab.onClickTab(tab);
    }

    // Set focus on tab clicked
    const tabElement = document.getElementById(tab.id);
    tabElement?.focus();
  };

  <template>
    {{#if @tabs}}
      <ul class="doc-page-tabs" role="tablist" ...attributes>
        {{#each @tabs as |tab|}}
          <li
            class="doc-page-tabs__tab
              {{if tab.isCurrent 'doc-page-tabs__tab--is-current'}}"
            role="presentation"
          >
            <button
              id={{tab.id}}
              type="button"
              role="tab"
              aria-controls={{tab.target}}
              aria-selected={{if tab.isCurrent "true" "false"}}
              {{on "click" (fn this.onClickTab tab)}}
            >{{capitalize tab.label}}</button>
          </li>
        {{/each}}
      </ul>
    {{/if}}
  </template>
}
