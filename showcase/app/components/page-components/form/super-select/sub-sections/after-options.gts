/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import { hash } from '@ember/helper';

import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwFlex from 'showcase/components/shw/flex';
import ShwOutliner from 'showcase/components/shw/outliner';
import NOOP from 'showcase/utils/noop';

import {
  HdsFormSuperSelectAfterOptions,
  HdsFormSuperSelectOptionGroup,
} from '@hashicorp/design-system-components/components';

const SubSectionAfterOptions: TemplateOnlyComponent = <template>
  <ShwTextH3>FormSuperSelectAfterOptions</ShwTextH3>

  <ShwTextH3>Content</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="No text arguments">
      <ShwOutliner>
        <HdsFormSuperSelectAfterOptions
          @clearSelected={{NOOP}}
          @showSelected={{NOOP}}
          @showAll={{NOOP}}
        />
      </ShwOutliner>
    </SF.Item>
  </ShwFlex>

  <ShwFlex as |SF|>
    <SF.Item @label="with @showNoSelectedMessage=true">
      <ShwOutliner>
        <HdsFormSuperSelectAfterOptions
          @showNoSelectedMessage={{true}}
          @clearSelected={{NOOP}}
          @showSelected={{NOOP}}
          @showAll={{NOOP}}
        />
      </ShwOutliner>
    </SF.Item>
  </ShwFlex>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="with @content (text)" {{style max-width="500px"}}>
      <ShwOutliner>
        <HdsFormSuperSelectAfterOptions
          @content="Lorem ipsum dolor"
          @clearSelected={{NOOP}}
          @showAll={{NOOP}}
          @showSelected={{NOOP}}
        />
      </ShwOutliner>
    </SF.Item>
    <SF.Item @label="with @content with long test" {{style max-width="500px"}}>
      <ShwOutliner>
        <HdsFormSuperSelectAfterOptions
          @content="This is the a very very very very very very long text that should wrap on multiple lines"
          @clearSelected={{NOOP}}
          @showAll={{NOOP}}
          @showSelected={{NOOP}}
        />
      </ShwOutliner>
    </SF.Item>
    <SF.Item
      @label="with @showAll & @selectedCount=0"
      {{style max-width="500px"}}
    >
      <ShwOutliner>
        <HdsFormSuperSelectAfterOptions
          @showAll={{NOOP}}
          @showOnlySelected={{true}}
          @selectedCount="0"
          @resultCountMessage="This is the resultCountMessage"
          @clearSelected={{NOOP}}
          @showSelected={{NOOP}}
        />
      </ShwOutliner>
    </SF.Item>
    <SF.Item
      @label="with @showAll & @selectedCount>0"
      {{style max-width="500px"}}
    >
      <ShwOutliner>
        <HdsFormSuperSelectAfterOptions
          @showAll={{NOOP}}
          @showOnlySelected={{true}}
          @selectedCount="123"
          @clearSelected={{NOOP}}
          @resultCountMessage="This is the resultCountMessage"
          @showSelected={{NOOP}}
        />
      </ShwOutliner>
    </SF.Item>
    <SF.Item
      @label="with @showSelected & @selectedCount=0"
      {{style max-width="500px"}}
    >
      <ShwOutliner>
        <HdsFormSuperSelectAfterOptions
          @showSelected={{NOOP}}
          @selectedCount="0"
          @resultCountMessage="This is the resultCountMessage"
          @clearSelected={{NOOP}}
          @showAll={{NOOP}}
        />
      </ShwOutliner>
    </SF.Item>
    <SF.Item
      @label="with @showSelected & @selectedCount>0"
      {{style max-width="500px"}}
    >
      <ShwOutliner>
        <HdsFormSuperSelectAfterOptions
          @showSelected={{NOOP}}
          @selectedCount="123"
          @clearSelected={{NOOP}}
          @resultCountMessage="This is the resultCountMessage"
          @showAll={{NOOP}}
        />
      </ShwOutliner>
    </SF.Item>
    <SF.Item
      @label="with @resultCountMessage with long text"
      {{style max-width="500px"}}
    >
      <ShwOutliner>
        <HdsFormSuperSelectAfterOptions
          @showNoSelectedMessage={{true}}
          @showAll={{NOOP}}
          @showSelected={{NOOP}}
          @clearSelected={{NOOP}}
          @selectedCount="123"
          @resultCountMessage="This is the a very very very long text that should wrap on multiple lines"
        />
      </ShwOutliner>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>Within a dropdown with options</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item @label="Single level">
      <div class="hds-form-super-select hds-form-super-select-multiple">
        <div class="ember-basic-dropdown">
          <div
            class="ember-basic-dropdown-content ember-power-select-dropdown"
            {{style position="static"}}
          >
            <ul
              class="ember-power-select-options"
              role="listbox"
              aria-label="Label"
              {{style max-height="none"}}
            >
              <HdsFormSuperSelectOptionGroup
                @group={{hash groupName="Lorem ipsum dolor"}}
              >
                {{! template-lint-disable require-context-role }}
                <li
                  class="ember-power-select-option"
                  role="option"
                  aria-selected="true"
                >
                  Option 1
                </li>
                <li class="ember-power-select-option" role="option">
                  Option 2
                </li>
              </HdsFormSuperSelectOptionGroup>
            </ul>
            <HdsFormSuperSelectAfterOptions
              @showAll={{NOOP}}
              @showSelected={{NOOP}}
              @clearSelected={{NOOP}}
              @selectedCount="123"
              @resultCountMessage="1 selected of 2 total"
            />
          </div>
        </div>
      </div>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionAfterOptions;
