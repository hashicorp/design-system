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
  HdsDropdownListItemCheckmark,
} from '@hashicorp/design-system-components/components';

// these are used only for presentation purpose in the showcase
const STATES = ['default', 'hover', 'active', 'focus'];

const SubSectionListItemsCheckmark: TemplateOnlyComponent = <template>
  <ShwTextH3>Checkmark</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Default">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list" role="listbox" aria-label="Default">
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckmark mock-state-value={{state}}>
              {{state}}
            </HdsDropdownListItemCheckmark>
          {{/each}}
          <HdsDropdownListItemCheckmark mock-state-value="disabled" disabled>
            disabled
          </HdsDropdownListItemCheckmark>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Selected">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list" role="listbox" aria-label="Selected">
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckmark
              mock-state-value={{state}}
              @selected={{true}}
            >
              {{state}}
            </HdsDropdownListItemCheckmark>
          {{/each}}
          <HdsDropdownListItemCheckmark
            mock-state-value="disabled"
            @selected={{true}}
            disabled
          >
            disabled
          </HdsDropdownListItemCheckmark>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Icon">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list" role="listbox" aria-label="Icon">
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckmark
              @icon="hexagon"
              mock-state-value={{state}}
            >
              {{state}}
            </HdsDropdownListItemCheckmark>
          {{/each}}
          <HdsDropdownListItemCheckmark
            @icon="hexagon"
            mock-state-value="disabled"
            disabled
          >
            disabled
          </HdsDropdownListItemCheckmark>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Icon, selected">
      <div class="hds-dropdown__content">
        <ul
          class="hds-dropdown__list"
          role="listbox"
          aria-label="Icon, selected"
        >
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckmark
              @icon="hexagon"
              mock-state-value={{state}}
              @selected={{true}}
            >
              {{state}}
            </HdsDropdownListItemCheckmark>
          {{/each}}
          <HdsDropdownListItemCheckmark
            @icon="hexagon"
            mock-state-value="disabled"
            @selected={{true}}
            disabled
          >
            disabled
          </HdsDropdownListItemCheckmark>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Count">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list" role="listbox" aria-label="Count">
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckmark
              mock-state-value={{state}}
              @count="12"
            >
              {{state}}
            </HdsDropdownListItemCheckmark>
          {{/each}}
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Count, selected">
      <div class="hds-dropdown__content">
        <ul
          class="hds-dropdown__list"
          role="listbox"
          aria-label="Count, selected"
        >
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckmark
              mock-state-value={{state}}
              @selected={{true}}
              @count="12"
            >
              {{state}}
            </HdsDropdownListItemCheckmark>
          {{/each}}
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Custom content">
      <div class="hds-dropdown__content">
        <ul
          class="hds-dropdown__list"
          role="listbox"
          aria-label="Custom content"
        >
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckmark
              mock-state-value={{state}}
              @count="12"
            >
              <ShwPlaceholder
                @text="custom content"
                @width="128"
                @height="20"
              />
            </HdsDropdownListItemCheckmark>
          {{/each}}
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Custom content, selected">
      <div class="hds-dropdown__content">
        <ul
          class="hds-dropdown__list"
          role="listbox"
          aria-label="Custom content, selected"
        >
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckmark
              mock-state-value={{state}}
              @selected={{true}}
              @count="12"
            >
              <ShwPlaceholder
                @text="custom content"
                @width="128"
                @height="20"
              />
            </HdsDropdownListItemCheckmark>
          {{/each}}
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Badge in content">
      <div class="hds-dropdown__content">
        <ul
          class="hds-dropdown__list"
          role="listbox"
          aria-label="Badge in content"
        >
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckmark mock-state-value={{state}}>
              {{state}}
              <HdsBadge @icon="org" @text="Private" @size="small" />
            </HdsDropdownListItemCheckmark>
          {{/each}}
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Badge in content, selected">
      <div class="hds-dropdown__content">
        <ul
          class="hds-dropdown__list"
          role="listbox"
          aria-label="Badge in content, selected"
        >
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckmark
              mock-state-value={{state}}
              @selected={{true}}
            >
              {{state}}
              <HdsBadge
                @icon="globe"
                @text="Public"
                @size="small"
                @color="highlight"
              />
            </HdsDropdownListItemCheckmark>
          {{/each}}
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Large content">
      <div class="hds-dropdown__content">
        <ul
          class="hds-dropdown__list"
          role="listbox"
          aria-label="Large content"
        >
          {{#each STATES as |state|}}
            <HdsDropdownListItemCheckmark
              mock-state-value={{state}}
              @icon="hexagon"
              @selected={{true}}
              @count="12"
            >
              {{state}}
              with a longer text string that may wrap since max-width is defined
              on the container
              <HdsBadge @text="badge" @size="small" />
            </HdsDropdownListItemCheckmark>
          {{/each}}
        </ul>
      </div>
    </SF.Item>
  </ShwFlex>
  <ShwFlex as |SF|>
    <SF.Item @label="Interactive">
      <HdsDropdown @listPosition="bottom-left" as |D|>
        <D.ToggleButton @text="Checkmark" @color="secondary" />
        <D.Checkmark @count="11">virtualbox</D.Checkmark>
        <D.Checkmark @count="1" @selected={{true}}>vmware</D.Checkmark>
        <D.Checkmark @count="10">docker</D.Checkmark>
        <D.Checkmark @count="0">hyperv</D.Checkmark>
      </HdsDropdown>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionListItemsCheckmark;
