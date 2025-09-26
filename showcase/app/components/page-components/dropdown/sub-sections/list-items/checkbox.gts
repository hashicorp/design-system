/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import {
  HdsBadge,
  HdsDropdown,
  HdsDropdownListItemCheckbox,
} from '@hashicorp/design-system-components/components';

// these are used only for presentation purpose in the showcase
const STATES = ['default', 'hover', 'active', 'focus'];

const SubSectionListItemsCheckbox: TemplateOnlyComponent = <template>
  <ShwTextH3>Checkbox</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Default">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckbox mock-state-value={{state}}>
              {{state}}
            </HdsDropdownListItemCheckbox>
          {{/each}}
          <HdsDropdownListItemCheckbox mock-state-value="disabled" disabled>
            disabled
          </HdsDropdownListItemCheckbox>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Checked">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckbox mock-state-value={{state}} checked>
              {{state}}
            </HdsDropdownListItemCheckbox>
          {{/each}}
          <HdsDropdownListItemCheckbox
            mock-state-value="disabled"
            disabled
            checked
          >
            disabled
          </HdsDropdownListItemCheckbox>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Icon">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckbox
              mock-state-value={{state}}
              @icon="hexagon"
            >
              {{state}}
            </HdsDropdownListItemCheckbox>
          {{/each}}
          <HdsDropdownListItemCheckbox
            mock-state-value="disabled"
            @icon="hexagon"
            disabled
          >
            disabled
          </HdsDropdownListItemCheckbox>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Icon, checked">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckbox
              mock-state-value={{state}}
              @icon="hexagon"
              checked
            >
              {{state}}
            </HdsDropdownListItemCheckbox>
          {{/each}}
          <HdsDropdownListItemCheckbox
            mock-state-value="disabled"
            @icon="hexagon"
            disabled
            checked
          >
            disabled
          </HdsDropdownListItemCheckbox>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Count">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckbox
              mock-state-value={{state}}
              @count="12"
            >{{state}}</HdsDropdownListItemCheckbox>
          {{/each}}
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Count, checked">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckbox
              mock-state-value={{state}}
              checked
              @count="12"
            >{{state}}</HdsDropdownListItemCheckbox>
          {{/each}}
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Custom content">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckbox mock-state-value={{state}} @count="12">
              <ShwPlaceholder
                @text="custom content"
                @width="122"
                @height="20"
              />
            </HdsDropdownListItemCheckbox>
          {{/each}}
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Custom content, checked">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckbox
              mock-state-value={{state}}
              checked
              @count="12"
            >
              <ShwPlaceholder
                @text="custom content"
                @width="122"
                @height="20"
              />
            </HdsDropdownListItemCheckbox>
          {{/each}}
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Badge in label">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckbox mock-state-value={{state}}>
              {{state}}
              <HdsBadge @icon="org" @text="Private" @size="small" />
            </HdsDropdownListItemCheckbox>
          {{/each}}
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Badge in label, checked">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckbox mock-state-value={{state}} checked>
              {{state}}
              <HdsBadge
                @icon="globe"
                @text="Public"
                @size="small"
                @color="highlight"
              />
            </HdsDropdownListItemCheckbox>
          {{/each}}
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Large content">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckbox
              mock-state-value={{state}}
              @count="12"
              @icon="hexagon"
            >
              {{state}}
              with a longer text string that may wrap since max-width is defined
              on the container
              <HdsBadge @text="badge" @size="small" />
            </HdsDropdownListItemCheckbox>
          {{/each}}
        </ul>
      </div>
    </SF.Item>
  </ShwFlex>
  <ShwFlex as |SF|>
    <SF.Item @label="Interactive">
      <HdsDropdown @listPosition="bottom-left" as |D|>
        <D.ToggleButton @text="Checkbox" @color="secondary" />
        <D.Checkbox
          name="checkbox-item-dropdown"
          @count="11"
        >virtualbox</D.Checkbox>
        <D.Checkbox
          name="checkbox-item-dropdown"
          @count="1"
          checked
        >vmware</D.Checkbox>
        <D.Checkbox
          name="checkbox-item-dropdown"
          @count="10"
        >docker</D.Checkbox>
        <D.Checkbox name="checkbox-item-dropdown" @count="0">hyperv</D.Checkbox>
      </HdsDropdown>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionListItemsCheckbox;
