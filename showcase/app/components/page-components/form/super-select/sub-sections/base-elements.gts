/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwOutliner from 'showcase/components/shw/outliner';

const STATES = ['default', 'hover', 'focus'];
const OPTIONS_STATES = ['default', 'hover', 'active'];

const SubSectionBaseElements: TemplateOnlyComponent = <template>
  <ShwTextH2>Base elements</ShwTextH2>

  <ShwTextH3>Trigger</ShwTextH3>

  <ShwFlex as |SF|>
    {{#each STATES as |state|}}
      <SF.Item @label={{capitalize state}}>
        <div class="hds-form-super-select">
          <div class="ember-basic-dropdown">
            <div class="ember-power-select-trigger" mock-state-value={{state}}>
              <span class="ember-power-select-selected-item">
                <span
                  class="hds-text hds-typography-body-200 hds-font-weight-regular"
                >Option</span>
              </span>
              <span class="ember-power-select-status-icon"></span>
            </div>
          </div>
        </div>
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Dropdown</ShwTextH3>

  <ShwTextH4>Search input</ShwTextH4>

  <ShwFlex as |SF|>
    {{#each STATES as |state|}}
      <SF.Item @label={{capitalize state}}>
        <div class="hds-form-super-select">
          <div class="ember-basic-dropdown">
            <ShwOutliner>
              <div class="ember-power-select-search">
                <input
                  class="ember-power-select-search-input"
                  type="search"
                  placeholder="Search"
                  aria-label="Search input"
                  mock-state-value={{state}}
                />
              </div>
            </ShwOutliner>
          </div>
        </div>
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwTextH4>Options (single selection)</ShwTextH4>

  <ShwFlex as |SG|>
    <SG.Item @label="Default">
      <div class="hds-form-super-select hds-form-super-select-single">
        <div class="ember-basic-dropdown">
          <div class="ember-basic-dropdown-content" {{style position="static"}}>
            <ul
              class="ember-power-select-options"
              role="listbox"
              aria-label="Label"
            >
              {{! there is no focused state for the select-option }}
              {{#each OPTIONS_STATES as |state|}}
                <li
                  class="ember-power-select-option"
                  role="option"
                  mock-state-value={{state}}
                >
                  {{state}}
                </li>
              {{/each}}
              <li
                class="ember-power-select-option"
                role="option"
                aria-disabled="true"
              >
                disabled
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SG.Item>
    <SG.Item @label="Selected">
      <div class="hds-form-super-select hds-form-super-select-single">
        <div class="ember-basic-dropdown">
          <div class="ember-basic-dropdown-content" {{style position="static"}}>
            <ul
              class="ember-power-select-options"
              role="listbox"
              aria-label="Label"
            >
              {{! there is no focused state for the select-option }}
              {{#each OPTIONS_STATES as |state|}}
                <li
                  class="ember-power-select-option"
                  aria-selected="true"
                  role="option"
                  mock-state-value={{state}}
                >
                  {{state}}
                </li>
              {{/each}}
              <li
                class="ember-power-select-option"
                role="option"
                aria-selected="true"
                aria-disabled="true"
              >
                disabled
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SG.Item>
    <SG.Item @label="With very long text" {{style width="200px"}}>
      <div class="hds-form-super-select hds-form-super-select-single">
        <div class="ember-basic-dropdown">
          <div class="ember-basic-dropdown-content" {{style position="static"}}>
            <ul
              class="ember-power-select-options"
              role="listbox"
              aria-label="Label"
              {{style max-height="none"}}
            >
              {{! there is no focused state for the select-option }}
              {{#each OPTIONS_STATES as |state|}}
                <li
                  class="ember-power-select-option"
                  aria-selected="true"
                  role="option"
                  mock-state-value={{state}}
                >
                  {{state}}
                  - this is a long text that should wrap on multiple lines
                </li>
              {{/each}}
            </ul>
          </div>
        </div>
      </div>
    </SG.Item>
  </ShwFlex>

  <ShwTextH4>Options (multiple selection)</ShwTextH4>

  <ShwFlex as |SG|>
    <SG.Item @label="Default">
      <div class="hds-form-super-select hds-form-super-select-multiple">
        <div class="ember-basic-dropdown">
          <div class="ember-basic-dropdown-content" {{style position="static"}}>
            <ul
              class="ember-power-select-options"
              role="listbox"
              aria-label="Label"
            >
              {{! there is no focused state for the select-option }}
              {{#each OPTIONS_STATES as |state|}}
                <li
                  class="ember-power-select-option"
                  role="option"
                  mock-state-value={{state}}
                >
                  {{state}}
                </li>
              {{/each}}
              <li
                class="ember-power-select-option"
                role="option"
                aria-disabled="true"
              >
                disabled
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SG.Item>
    <SG.Item @label="Selected">
      <div class="hds-form-super-select hds-form-super-select-multiple">
        <div class="ember-basic-dropdown">
          <div class="ember-basic-dropdown-content" {{style position="static"}}>
            <ul
              class="ember-power-select-options"
              role="listbox"
              aria-label="Label"
            >
              {{! there is no focused state for the select-option }}
              {{#each OPTIONS_STATES as |state|}}
                <li
                  class="ember-power-select-option"
                  role="option"
                  aria-selected="true"
                  mock-state-value={{state}}
                >
                  {{state}}
                </li>
              {{/each}}
              <li
                class="ember-power-select-option"
                role="option"
                aria-selected="true"
                aria-disabled="true"
              >
                disabled
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SG.Item>
    <SG.Item @label="With very long text" {{style width="200px"}}>
      <div class="hds-form-super-select hds-form-super-select-multiple">
        <div class="ember-basic-dropdown">
          <div class="ember-basic-dropdown-content" {{style position="static"}}>
            <ul
              class="ember-power-select-options"
              role="listbox"
              aria-label="Label"
              {{style max-height="none"}}
            >
              {{! there is no focused state for the select-option }}
              {{#each OPTIONS_STATES as |state|}}
                <li
                  class="ember-power-select-option"
                  aria-selected="true"
                  role="option"
                  mock-state-value={{state}}
                >
                  {{state}}
                  - this is a long text that should wrap on multiple lines
                </li>
              {{/each}}
            </ul>
          </div>
        </div>
      </div>
    </SG.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionBaseElements;
