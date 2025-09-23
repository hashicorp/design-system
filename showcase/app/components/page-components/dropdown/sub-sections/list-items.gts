/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import {
  HdsBadge,
  HdsDropdown,
  HdsDropdownListItemCheckbox,
  HdsDropdownListItemCheckmark,
  HdsDropdownListItemCopyItem,
  HdsDropdownListItemDescription,
  HdsDropdownListItemGeneric,
  HdsDropdownListItemInteractive,
  HdsDropdownListItemRadio,
  HdsDropdownListItemSeparator,
  HdsDropdownListItemTitle,
} from '@hashicorp/design-system-components/components';
import { COLORS as ITEM_INTERACTIVE_COLORS } from '@hashicorp/design-system-components/components/hds/dropdown/list-item/interactive';

// these are used only for presentation purpose in the showcase
const STATES = ['default', 'hover', 'active', 'focus'];

const SubSectionListItems: TemplateOnlyComponent = <template>
  <ShwTextH2>List Items</ShwTextH2>

  <ShwTextH3>Title / Description / Separator</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Default (min width)">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemTitle @text="A simple title" />
          <HdsDropdownListItemDescription @text="A description." />
          <HdsDropdownListItemSeparator />
          <HdsDropdownListItemInteractive
            @route="index"
          >Item</HdsDropdownListItemInteractive>
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
          <HdsDropdownListItemInteractive
            @route="index"
            @text="A longer item that could span multiple lines if the characters surpass a certain length"
          />
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
          <HdsDropdownListItemInteractive
            @route="index"
            @text="A longer item that could span multiple lines if the characters surpass a certain length"
          />
        </ul>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Interactive</ShwTextH3>

  <ShwTextH4>Generated element</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item as |SFI|>
      <SFI.Label>Default ⇒ <code>&lt;button&gt;</code></SFI.Label>
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemInteractive>
            Lorem ipsum dolor
          </HdsDropdownListItemInteractive>
        </ul>
      </div>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With
        <code>@href</code>
        ⇒
        <code>&lt;a&gt;</code>
      </SFI.Label>
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemInteractive @href="/">
            Lorem ipsum dolor
          </HdsDropdownListItemInteractive>
        </ul>
      </div>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With
        <code>@route</code>
        ⇒
        <code>&lt;LinkTo&gt;</code>
        ⇒
        <code>&lt;a&gt;</code>
      </SFI.Label>
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemInteractive @route="page-components.dropdown">
            Lorem ipsum dolor
          </HdsDropdownListItemInteractive>
        </ul>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>Icons</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item @label="No icon (default)">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemInteractive>
            Basic
          </HdsDropdownListItemInteractive>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Leading icon">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemInteractive @icon="settings">
            Settings
          </HdsDropdownListItemInteractive>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Trailing icon">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemInteractive @trailingIcon="external-link">
            Documentation
          </HdsDropdownListItemInteractive>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Leading + Trailing icons">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemInteractive
            @icon="terraform-color"
            @trailingIcon="external-link"
          >
            Terraform
          </HdsDropdownListItemInteractive>
        </ul>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>Badge</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item @label="No icon (default)">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemInteractive as |I|>
            With badge
            <I.Badge @text="Badge" />
          </HdsDropdownListItemInteractive>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Leading icon">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemInteractive @icon="settings" as |I|>
            With leading icon
            <I.Badge @text="Badge" />
          </HdsDropdownListItemInteractive>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Trailing icon">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemInteractive @trailingIcon="external-link" as |I|>
            With trailing icon
            <I.Badge @text="Badge" />
          </HdsDropdownListItemInteractive>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Leading + Trailing icon">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemInteractive
            @icon="settings"
            @trailingIcon="external-link"
            as |I|
          >
            With leading + trailing icons
            <I.Badge @text="Badge" />
          </HdsDropdownListItemInteractive>
        </ul>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwFlex as |SF|>
    <SF.Item @label="With long content that might push the badge down">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemInteractive
            @icon="settings"
            @trailingIcon="external-link"
            as |I|
          >
            Lorem ipsum dolor sit amet, consectetur adipisici tempor incidunt ut
            labore et dolore
            <I.Badge @text="Badge" />
          </HdsDropdownListItemInteractive>
        </ul>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>Colors</ShwTextH4>

  <ShwFlex as |SF|>
    <SF.Item @label="Action (default)">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemInteractive @icon="settings" @color="action">
            Lorem ipsum dolor
          </HdsDropdownListItemInteractive>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Critical">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemInteractive @icon="trash" @color="critical">
            Lorem ipsum dolor
          </HdsDropdownListItemInteractive>
        </ul>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>States (in each color)</ShwTextH4>

  {{#each ITEM_INTERACTIVE_COLORS as |color|}}
    <ShwFlex @direction="column" as |SF|>
      <SF.Item @label={{capitalize color}}>
        <ShwFlex as |SF|>
          <SF.Item>
            <div class="hds-dropdown__content">
              <ul class="hds-dropdown__list">
                {{#each STATES as |state|}}
                  <HdsDropdownListItemInteractive
                    @color={{color}}
                    mock-state-value={{state}}
                  >
                    {{state}}
                  </HdsDropdownListItemInteractive>
                {{/each}}
                <HdsDropdownListItemSeparator />
                <HdsDropdownListItemInteractive
                  @color={{color}}
                  @isLoading={{true}}
                >
                  Loading
                </HdsDropdownListItemInteractive>
                <HdsDropdownListItemInteractive
                  @color={{color}}
                  @isLoading={{true}}
                  as |I|
                >
                  Loading
                  <I.Badge @text="With Badge" />
                </HdsDropdownListItemInteractive>
              </ul>
            </div>
          </SF.Item>
          <SF.Item>
            <div class="hds-dropdown__content">
              <ul class="hds-dropdown__list">
                {{#each STATES as |state|}}
                  <HdsDropdownListItemInteractive
                    @icon={{if (eq color "critical") "trash" "settings"}}
                    @color={{color}}
                    mock-state-value={{state}}
                  >
                    {{state}}
                    with icon
                  </HdsDropdownListItemInteractive>
                {{/each}}
                <HdsDropdownListItemSeparator />
                <HdsDropdownListItemInteractive
                  @icon={{if (eq color "critical") "trash" "settings"}}
                  @color={{color}}
                  @isLoading={{true}}
                >
                  loading with icon
                </HdsDropdownListItemInteractive>
                <HdsDropdownListItemInteractive
                  @icon={{if (eq color "critical") "trash" "settings"}}
                  @color={{color}}
                  @isLoading={{true}}
                  as |I|
                >
                  Loading
                  <I.Badge @text="With Badge" />
                </HdsDropdownListItemInteractive>
              </ul>
            </div>
          </SF.Item>
          <SF.Item>
            <div class="hds-dropdown__content">
              <ul class="hds-dropdown__list">
                {{#each STATES as |state|}}
                  <HdsDropdownListItemInteractive
                    @icon={{if (eq color "critical") "trash" "settings"}}
                    @color={{color}}
                    mock-state-value={{state}}
                  >
                    {{state}}
                    with a longer text string that may wrap since max-width is
                    defined on the container
                  </HdsDropdownListItemInteractive>
                {{/each}}
              </ul>
            </div>
          </SF.Item>
        </ShwFlex>
      </SF.Item>
    </ShwFlex>
  {{/each}}

  <ShwDivider @level={{2}} />

  <ShwTextH3>Generic</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item>
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          <HdsDropdownListItemGeneric>
            <ShwPlaceholder
              @text="some generic content here"
              @width="200"
              @height="40"
              @background="#e1f5fe"
            />
          </HdsDropdownListItemGeneric>
        </ul>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

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

  <ShwTextH3>Radio</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Default">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemRadio mock-state-value={{state}}>
              {{state}}
            </HdsDropdownListItemRadio>
          {{/each}}
          <HdsDropdownListItemRadio mock-state-value="disabled" disabled>
            disabled
          </HdsDropdownListItemRadio>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Checked">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemRadio mock-state-value={{state}} checked>
              {{state}}
            </HdsDropdownListItemRadio>
          {{/each}}
          <HdsDropdownListItemRadio
            mock-state-value="disabled"
            checked
            disabled
          >
            disabled
          </HdsDropdownListItemRadio>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Icon">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemRadio
              mock-state-value={{state}}
              @icon="hexagon"
            >
              {{state}}
            </HdsDropdownListItemRadio>
          {{/each}}
          <HdsDropdownListItemRadio
            mock-state-value="disabled"
            @icon="hexagon"
            disabled
          >
            disabled
          </HdsDropdownListItemRadio>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Icon, checked">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemRadio
              mock-state-value={{state}}
              checked
              @icon="hexagon"
            >
              {{state}}
            </HdsDropdownListItemRadio>
          {{/each}}
          <HdsDropdownListItemRadio
            mock-state-value="disabled"
            @icon="hexagon"
            checked
            disabled
          >
            disabled
          </HdsDropdownListItemRadio>
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Count">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemRadio
              mock-state-value={{state}}
              @count="12"
            >{{state}}</HdsDropdownListItemRadio>
          {{/each}}
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Count, checked">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemRadio
              mock-state-value={{state}}
              checked
              @count="12"
            >{{state}}</HdsDropdownListItemRadio>
          {{/each}}
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Custom content">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemRadio mock-state-value={{state}} @count="12">
              <ShwPlaceholder
                @text="custom content"
                @width="122"
                @height="20"
              />
            </HdsDropdownListItemRadio>
          {{/each}}
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Custom content, checked">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemRadio
              mock-state-value={{state}}
              checked
              @count="12"
            >
              <ShwPlaceholder
                @text="custom content"
                @width="122"
                @height="20"
              />
            </HdsDropdownListItemRadio>
          {{/each}}
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Badge in label">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemRadio mock-state-value={{state}}>
              {{state}}
              <HdsBadge @icon="org" @text="Private" @size="small" />
            </HdsDropdownListItemRadio>
          {{/each}}
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Badge in label, checked">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemRadio mock-state-value={{state}} checked>
              {{state}}
              <HdsBadge
                @icon="globe"
                @text="Public"
                @size="small"
                @color="highlight"
              />
            </HdsDropdownListItemRadio>
          {{/each}}
        </ul>
      </div>
    </SF.Item>
    <SF.Item @label="Large content">
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list">
          {{#each STATES as |state|}}
            <HdsDropdownListItemRadio
              mock-state-value={{state}}
              @count="12"
              @icon="hexagon"
            >
              {{state}}
              with a longer text string that may wrap since max-width is defined
              on the container
              <HdsBadge @text="badge" @size="small" />
            </HdsDropdownListItemRadio>
          {{/each}}
        </ul>
      </div>
    </SF.Item>
  </ShwFlex>
  <ShwFlex as |SF|>
    <SF.Item @label="Interactive">
      <HdsDropdown @listPosition="bottom-left" as |D|>
        <D.ToggleButton @text="Radio" @color="secondary" />
        <D.Radio name="radio-item-dropdown" @count="11">virtualbox</D.Radio>
        <D.Radio name="radio-item-dropdown" @count="1" checked>vmware</D.Radio>
        <D.Radio name="radio-item-dropdown" @count="10">docker</D.Radio>
        <D.Radio name="radio-item-dropdown" @count="0">hyperv</D.Radio>
      </HdsDropdown>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionListItems;
