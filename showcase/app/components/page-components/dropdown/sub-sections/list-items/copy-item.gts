/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import { HdsDropdownListItemCopyItem } from '@hashicorp/design-system-components/components';

// these are used only for presentation purpose in the showcase
const STATES = ['default', 'hover', 'active', 'focus'];

const SubSectionListItemsCopyItem: TemplateOnlyComponent = <template>
  <ShwTextH3>CopyItem</ShwTextH3>
  <ShwTextH4>Content</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item @label="With short text">
      {{! Notice: we want to emulate the case of a fixed width list }}
      <div class="hds-dropdown__content" {{style width="250px"}}>
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemCopyItem @text="Lorem ipsum" />
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="With long text">
      <div class="hds-dropdown__content" {{style width="250px"}}>
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemCopyItem
            @text="91ee1e8ef65b337f0e70d793f456c71d"
          />
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="With long text + isTruncated=false">
      <div class="hds-dropdown__content" {{style width="250px"}}>
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemCopyItem
            @copyItemTitle="Lorem ipsum dolor"
            @text="91ee1e8ef65b337f0e70d793f456c71d"
            @isTruncated={{false}}
          />
        </ul>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwFlex as |SF|>
    <SF.Item @label="Short text + copyItemTitle">
      {{! Notice: we want to emulate the case of a fixed width list }}
      <div class="hds-dropdown__content" {{style width="250px"}}>
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemCopyItem
            @copyItemTitle="Lorem ipsum dolor"
            @text="Lorem ipsum"
          />
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Long text + copyItemTitle">
      <div class="hds-dropdown__content" {{style width="250px"}}>
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemCopyItem
            @copyItemTitle="Lorem ipsum dolor"
            @text="91ee1e8ef65b337f0e70d793f456c71d"
          />
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Long text + copyItemTitle + isTruncated=false">
      <div class="hds-dropdown__content" {{style width="250px"}}>
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemCopyItem
            @copyItemTitle="Lorem ipsum dolor"
            @text="91ee1e8ef65b337f0e70d793f456c71d"
            @isTruncated={{false}}
          />
        </ul>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwTextH3>States</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Base">
      {{! Notice: we want to emulate the case of a fixed width list }}
      <div class="hds-dropdown__content" {{style width="250px"}}>
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemCopyItem
              @text="{{state}}: fbrct1ed-fgr35h-tyng89-wed4r"
              mock-state-value={{state}}
              mock-state-selector="button"
            />
          {{/each}}
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="With copyItemTitle">
      {{! Notice: we want to emulate the case of a fixed width list }}
      <div class="hds-dropdown__content" {{style width="250px"}}>
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemCopyItem
              @text="{{state}}: fbrct1ed-fgr35h-tyng89-wed4r"
              @copyItemTitle="Lorem ipsumy dolor"
              mock-state-value={{state}}
              mock-state-selector="button"
            />
          {{/each}}
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="With copyItemTitle + isTruncated=false">
      {{! Notice: we want to emulate the case of a fixed width list }}
      <div class="hds-dropdown__content" {{style width="250px"}}>
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemCopyItem
              @text="{{state}}: fbrct1ed-fgr35h-tyng89-wed4r"
              @copyItemTitle="Lorem ipsumy dolor"
              @isTruncated={{false}}
              mock-state-value={{state}}
              mock-state-selector="button"
            />
          {{/each}}
        </ul>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionListItemsCopyItem;
