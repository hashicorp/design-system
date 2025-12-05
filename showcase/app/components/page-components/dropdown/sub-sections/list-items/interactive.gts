/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import {
  HdsDropdownListItemInteractive,
  HdsDropdownListItemSeparator,
} from '@hashicorp/design-system-components/components';
import { COLORS as ITEM_INTERACTIVE_COLORS } from '@hashicorp/design-system-components/components/hds/dropdown/list-item/interactive';

// these are used only for presentation purpose in the showcase
const STATES = ['default', 'hover', 'active', 'focus'];

const SubSectionListItemsInteractive: TemplateOnlyComponent = <template>
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
</template>;

export default SubSectionListItemsInteractive;
