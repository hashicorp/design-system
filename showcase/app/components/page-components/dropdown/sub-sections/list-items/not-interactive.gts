/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import {
  HdsDropdownListItemDescription,
  HdsDropdownListItemInteractive,
  HdsDropdownListItemSeparator,
  HdsDropdownListItemTitle,
} from '@hashicorp/design-system-components/components';

const SubSectionListItemNotInteractive: TemplateOnlyComponent = <template>
  <ShwTextH3>Title / Description / Separator</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Default (min width)">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemTitle @text="A simple title" />
          <HdsDropdownListItemDescription @text="A description." />
          <HdsDropdownListItemSeparator />
          <HdsDropdownListItemInteractive @route="index">Item</HdsDropdownListItemInteractive>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Default (max width)">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemTitle
            @text="A longer title that could span multiple lines if the characters surpass a certain length"
          />
          <HdsDropdownListItemDescription
            @text="A longer description that could span on multiple lines if the number of characters require more width than the dropdown provides by default."
          />
          <HdsDropdownListItemSeparator />
          <HdsDropdownListItemInteractive @route="index">
            A longer item that could span multiple lines if the characters surpass a certain length
          </HdsDropdownListItemInteractive>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Fixed width">
      <div class="hds-dropdown__content" {{style width="250px"}}>
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemTitle
            @text="A longer title that could span multiple lines if the characters surpass a certain length"
          />
          <HdsDropdownListItemDescription
            @text="A longer description that could span on multiple lines if the number of characters require more width than the dropdown provides by default."
          />
          <HdsDropdownListItemSeparator />
          <HdsDropdownListItemInteractive @route="index">
            A longer item that could span multiple lines if the characters surpass a certain length
          </HdsDropdownListItemInteractive>
        </ul>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionListItemNotInteractive;
