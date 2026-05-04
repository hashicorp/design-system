/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';
import { concat } from '@ember/helper';
import style from 'ember-style-modifier';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';
import ShwOutliner from 'showcase/components/shw/outliner';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import {
  HdsDropdown,
  HdsDropdownListItemInteractive,
  HdsDropdownListItemSeparator,
  HdsDropdownListItemCheckbox,
  HdsDropdownListItemCheckmark,
  HdsDropdownListItemRadio,
  HdsDropdownListItemGeneric,
  HdsDropdownListItemCopyItem,
  HdsDropdownToggleButton,
  HdsDropdownToggleIcon,
  HdsLinkStandalone,
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus', 'disabled'];

import { COLORS as ITEM_INTERACTIVE_COLORS } from '@hashicorp/design-system-components/components/hds/dropdown/list-item/interactive';

import {
  COLORS,
  SIZES,
} from '@hashicorp/design-system-components/components/hds/dropdown/toggle/button';

const DropdownCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "Dropdown - Carbonization"}}

  <ShwTextH1>Dropdown - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>Content</ShwTextH2>

    <ShwTextH3>Basic Dropdown</ShwTextH3>

    <ShwTextH4>No exact Carbon equivalent</ShwTextH4>

    <ShwCarbonizationComparisonGrid @label="with title, description, & footer">
      <:theming>
        <HdsDropdown as |D|>
          <D.ToggleButton @text="Select item" />
          <D.Title @text="Title" />
          <D.Description @text="Description text" />
          <D.Separator />
          <D.Interactive @href="#">Lorem, ipsum dolor sit amet consectetur.</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 1</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 2</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 3</D.Interactive>
          <D.Footer @hasDivider={{true}}>
            <HdsLinkStandalone
              @icon="plus"
              @text="Add organization"
              @href="#"
            />
          </D.Footer>
        </HdsDropdown>
      </:theming>
      <:reference>
        <cds-dropdown label="Select item">
          <cds-dropdown-item value="option-0">Lorem, ipsum dolor sit amet
            consectetur.</cds-dropdown-item>
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
          <cds-dropdown-item value="option-2">Option 2</cds-dropdown-item>
          <cds-dropdown-item value="option-3">Option 3</cds-dropdown-item>
        </cds-dropdown>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH4>Closest Carbon equivalent</ShwTextH4>

    <ShwCarbonizationComparisonGrid
      @label="minimal features & matchToggleWidth=true"
    >
      <:theming>
        <HdsDropdown @matchToggleWidth={{true}} as |D|>
          <D.ToggleButton @text="Select item" />
          <D.Interactive @href="#">Lorem, ipsum dolor sit amet consectetur.</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 1</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 2</D.Interactive>
          <D.Separator />
          <D.Interactive @href="#">Option 3</D.Interactive>
        </HdsDropdown>
      </:theming>
      <:reference>
        <cds-dropdown label="Select item">
          <cds-dropdown-item value="option-0">Lorem, ipsum dolor sit amet
            consectetur.</cds-dropdown-item>
          <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
          <cds-dropdown-item value="option-2">Option 2</cds-dropdown-item>
          <cds-dropdown-item value="option-3">Option 3</cds-dropdown-item>
        </cds-dropdown>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Dropdown with checkboxes</ShwTextH3>

    <ShwTextBody>
      Note: Carbon does not appear to have a “multiselect” variant of the
      Dropdown web component, only of the Dropdown React component which would
      be the closest equivalent to the HdsDropdown with checkboxes.
    </ShwTextBody>

    <ShwCarbonizationComparisonGrid @label="minimal equivalent features">
      <:theming>
        <HdsDropdown @matchToggleWidth={{true}} as |D|>
          <D.ToggleButton @text="Select item" />
          <D.Checkbox>Option 1</D.Checkbox>
          <D.Separator />
          <D.Checkbox>Option 2</D.Checkbox>
          <D.Separator />
          <D.Checkbox>Option 3</D.Checkbox>
        </HdsDropdown>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>Base elements</ShwTextH2>

    <ShwTextH3>Toggle with text</ShwTextH3>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        {{#each COLORS as |color|}}
          <ShwFlex as |SF|>
            {{#each SIZES as |size|}}
              <SF.Item @label="{{capitalize color}} {{size}}">
                <ShwFlex @direction="column" as |SF|>
                  <SF.Item @label="text only">
                    <HdsDropdownToggleButton
                      @color={{color}}
                      @text="Select item"
                      @size={{size}}
                    />
                  </SF.Item>
                  <SF.Item @label="with icon & count">
                    <HdsDropdownToggleButton
                      @icon="hexagon"
                      @count="12"
                      @color={{color}}
                      @text="Select item"
                      @size={{size}}
                    />
                  </SF.Item>

                  <SF.Item @label="with badge">
                    <HdsDropdownToggleButton
                      @color={{color}}
                      @text="Select item"
                      @size={{size}}
                      @badge="Badge"
                      @badgeIcon="hexagon"
                    />
                  </SF.Item>
                </ShwFlex>
              </SF.Item>
            {{/each}}

            <SF.Item @label="{{capitalize color}} full width">
              <ShwFlex @direction="column" as |SF|>
                <SF.Item @label="text only">
                  <ShwOutliner {{style width="300px"}}>
                    <HdsDropdownToggleButton
                      @isFullWidth={{true}}
                      @text="Select item"
                      @color={{color}}
                    />
                  </ShwOutliner>
                </SF.Item>
                <SF.Item @label="with icon & count">
                  <ShwOutliner {{style width="300px"}}>
                    <HdsDropdownToggleButton
                      @icon="hexagon"
                      @count="12"
                      @isFullWidth={{true}}
                      @text="Select item"
                      @color={{color}}
                    />
                  </ShwOutliner>
                </SF.Item>
                <SF.Item @label="with badge">
                  <ShwOutliner {{style width="300px"}}>
                    <HdsDropdownToggleButton
                      @isFullWidth={{true}}
                      @text="Select item"
                      @color={{color}}
                      @badge="Badge"
                      @badgeIcon="hexagon"
                    />
                  </ShwOutliner>
                </SF.Item>
              </ShwFlex>
            </SF.Item>
          </ShwFlex>
        {{/each}}
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Toggle with icon/image</ShwTextH3>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        <ShwFlex as |SF|>
          {{#each SIZES as |size|}}
            <SF.Item @label="With icon + chevron, {{size}}">
              <HdsDropdownToggleIcon
                @icon="user"
                @text="user menu"
                @size={{size}}
              />
            </SF.Item>
          {{/each}}
        </ShwFlex>

        <ShwFlex as |SF|>
          {{#each SIZES as |size|}}
            <SF.Item @label="With image (avatar), {{size}}">
              <HdsDropdownToggleIcon
                @imageSrc="/assets/images/avatar.png"
                @text="user menu"
                @size={{size}}
              />
            </SF.Item>
          {{/each}}

          <SF.Item @label="With broken image (fallback to icon)">
            <HdsDropdownToggleIcon
              @imageSrc="/assets/images/avatar-broken.png"
              @text="user menu"
            />
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Toggle states</ShwTextH3>

    <ShwTextH4>Text Toggle states</ShwTextH4>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        {{#each STATES as |state|}}
          <ShwFlex as |SF|>
            {{#if (eq state "disabled")}}
              <SF.Item @label="Disabled">
                <HdsDropdownToggleButton
                  @text="Select"
                  @icon="hexagon"
                  @count="5"
                  @badge="Badge"
                  @badgeIcon="hexagon"
                  disabled
                />
              </SF.Item>
            {{else}}
              <SF.Item @label="{{capitalize state}} state">
                <HdsDropdownToggleButton
                  @text="Select"
                  @icon="hexagon"
                  @count="5"
                  @badge="Badge"
                  @badgeIcon="hexagon"
                  mock-state-value={{state}}
                />
              </SF.Item>
            {{/if}}
          </ShwFlex>
        {{/each}}
      </:theming>
      <:reference>
        <pre>TODO: static image here</pre>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH4>Icon/image Toggle states</ShwTextH4>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        {{#each STATES as |state|}}
          <ShwFlex as |SF|>
            {{#if (eq state "disabled")}}
              <SF.Item @label="Disabled">
                <ShwFlex @direction="column" as |SF|>
                  <SF.Item>
                    <HdsDropdownToggleIcon
                      @icon="more-horizontal"
                      @text="overflow menu"
                      @hasChevron={{false}}
                      disabled
                    />
                  </SF.Item>
                  <SF.Item>
                    <HdsDropdownToggleIcon
                      @icon="user"
                      @text="user menu"
                      disabled
                    />
                  </SF.Item>
                  <SF.Item>
                    <HdsDropdownToggleIcon
                      @text={{state}}
                      @imageSrc="/assets/images/avatar.png"
                      disabled
                    />
                  </SF.Item>
                </ShwFlex>
              </SF.Item>
            {{else}}
              <SF.Item @label="{{capitalize state}} state">
                <ShwFlex @direction="column" as |SF|>
                  <SF.Item>
                    <HdsDropdownToggleIcon
                      @icon="more-horizontal"
                      @text="overflow menu"
                      @hasChevron={{false}}
                      mock-state-value={{state}}
                    />
                  </SF.Item>
                  <SF.Item>
                    <HdsDropdownToggleIcon
                      @icon="user"
                      @text="user menu"
                      mock-state-value={{state}}
                    />
                  </SF.Item>
                  <SF.Item>
                    <HdsDropdownToggleIcon
                      @text={{state}}
                      @imageSrc="/assets/images/avatar.png"
                      mock-state-value={{state}}
                    />
                  </SF.Item>
                </ShwFlex>
              </SF.Item>
            {{/if}}
          </ShwFlex>
        {{/each}}
      </:theming>
      <:reference>
        <pre>TODO: static image here</pre>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>All List Item component types</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <div class="hds-dropdown__content">
              <ul class="hds-dropdown__list">
                <HdsDropdownListItemInteractive>
                  List Item Interactive
                </HdsDropdownListItemInteractive>

                <HdsDropdownListItemSeparator />

                <HdsDropdownListItemCheckmark @selected={{true}}>
                  List Item Checkmark
                </HdsDropdownListItemCheckmark>

                <HdsDropdownListItemSeparator />

                <HdsDropdownListItemCheckbox>
                  List Item Checkbox
                </HdsDropdownListItemCheckbox>

                <HdsDropdownListItemSeparator />

                <HdsDropdownListItemRadio>
                  List Item Radio
                </HdsDropdownListItemRadio>

                <HdsDropdownListItemSeparator />

                <HdsDropdownListItemCopyItem @text="List Item Copy Item" />

                <HdsDropdownListItemSeparator />

                <HdsDropdownListItemGeneric>
                  <span
                    class="hds-text hds-typography-body-200 hds-font-weight-medium hds-dropdown-list-item__interactive-text"
                  >
                    List Item Generic
                  </span>
                </HdsDropdownListItemGeneric>
              </ul>
            </div>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH3>List Item Interactive states</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="with title, description, footer, & matchToggleWidth=true"
    >
      <:theming>
        {{#each ITEM_INTERACTIVE_COLORS as |color|}}
          <ShwFlex @direction="column" as |SF|>
            <SF.Item @label={{concat (capitalize color) " color"}}>
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
                        <HdsDropdownListItemSeparator />
                      {{/each}}
                      <HdsDropdownListItemInteractive
                        @color={{color}}
                        @isLoading={{true}}
                      >
                        Loading
                      </HdsDropdownListItemInteractive>
                    </ul>
                  </div>
                </SF.Item>
              </ShwFlex>
            </SF.Item>
          </ShwFlex>
        {{/each}}
      </:theming>
      <:reference>
        <pre>TODO: static image here</pre>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>List Item Generic</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <div class="hds-dropdown__content">
          <ul class="hds-dropdown__list">
            <HdsDropdownListItemGeneric>
              <ShwPlaceholder
                @text="generic content"
                @width="200"
                @height="40"
                @background="hsl(197, 100%, 75%, 0.2)"
              />
            </HdsDropdownListItemGeneric>
          </ul>
        </div>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>List Item Copy Item states</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <div class="hds-dropdown__content">
          <ul class="hds-dropdown__list">
            {{#each STATES as |state|}}
              <HdsDropdownListItemCopyItem
                @text={{state}}
                mock-state-value={{state}}
                mock-state-selector="button"
              />
              <HdsDropdownListItemSeparator />
            {{/each}}
          </ul>
        </div>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>List Item Checkmark states</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="with title, description, footer, & matchToggleWidth=true"
    >
      <:theming>
        <ShwFlex as |SF|>
          <SF.Item @label="Default">
            <div class="hds-dropdown__content">
              <ul
                class="hds-dropdown__list"
                role="listbox"
                aria-label="Default"
              >
                {{#each STATES as |state|}}
                  <HdsDropdownListItemCheckmark mock-state-value={{state}}>
                    {{state}}
                  </HdsDropdownListItemCheckmark>
                  <HdsDropdownListItemSeparator />
                {{/each}}
                <HdsDropdownListItemCheckmark
                  mock-state-value="disabled"
                  disabled
                >
                  disabled
                </HdsDropdownListItemCheckmark>
              </ul>
            </div>
          </SF.Item>
          <SF.Item @label="Selected">
            <div class="hds-dropdown__content">
              <ul
                class="hds-dropdown__list"
                role="listbox"
                aria-label="Selected"
              >
                {{#each STATES as |state|}}
                  <HdsDropdownListItemCheckmark
                    mock-state-value={{state}}
                    @selected={{true}}
                  >
                    {{state}}
                  </HdsDropdownListItemCheckmark>
                  <HdsDropdownListItemSeparator />
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
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>List Item Checkbox states</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="with title, description, footer, & matchToggleWidth=true"
    >
      <:theming>
        <ShwFlex as |SF|>
          <SF.Item @label="Default">
            <div class="hds-dropdown__content">
              <ul class="hds-dropdown__list">
                {{#each STATES as |state|}}
                  <HdsDropdownListItemCheckbox mock-state-value={{state}}>
                    {{state}}
                  </HdsDropdownListItemCheckbox>
                  <HdsDropdownListItemSeparator />
                {{/each}}
                <HdsDropdownListItemCheckbox
                  mock-state-value="disabled"
                  disabled
                >
                  disabled
                </HdsDropdownListItemCheckbox>
              </ul>
            </div>
          </SF.Item>
          <SF.Item @label="Checked">
            <div class="hds-dropdown__content">
              <ul class="hds-dropdown__list">
                {{#each STATES as |state|}}
                  <HdsDropdownListItemCheckbox
                    mock-state-value={{state}}
                    checked
                  >
                    {{state}}
                  </HdsDropdownListItemCheckbox>
                  <HdsDropdownListItemSeparator />
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
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>List Item Radio states</ShwTextH3>

    <ShwCarbonizationComparisonGrid
      @label="with title, description, footer, & matchToggleWidth=true"
    >
      <:theming>
        <ShwFlex as |SF|>
          <SF.Item @label="Default">
            <div class="hds-dropdown__content">
              <ul class="hds-dropdown__list">
                {{#each STATES as |state|}}
                  <HdsDropdownListItemRadio mock-state-value={{state}}>
                    {{state}}
                  </HdsDropdownListItemRadio>
                  <HdsDropdownListItemSeparator />
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
                  <HdsDropdownListItemSeparator />
                {{/each}}
                <HdsDropdownListItemRadio
                  mock-state-value="disabled"
                  disabled
                  checked
                >
                  disabled
                </HdsDropdownListItemRadio>
              </ul>
            </div>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>
  </section>
</template>;

export default DropdownCarbonizationIndex;
