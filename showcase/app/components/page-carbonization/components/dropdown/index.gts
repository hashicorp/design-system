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
import ShwFlex from 'showcase/components/shw/flex';
import ShwDivider from 'showcase/components/shw/divider';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';
import ShwOutliner from 'showcase/components/shw/outliner';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

import {
  HdsButton,
  HdsButtonSet,
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
  HdsDropdownListItemTitle,
  HdsDropdownListItemDescription,
  HdsLinkStandalone,
  HdsDropdownHeader,
  HdsDropdownFooter,
  HdsFormTextInputBase,
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'focus', 'active'];
const GENERIC_ITEMS = ['1', '2', '3'];
const ORGANIZATIONS = ['Organization A', 'Organization B', 'Organization C'];

import { COLORS as ITEM_INTERACTIVE_COLORS } from '@hashicorp/design-system-components/components/hds/dropdown/list-item/interactive';

import {
  COLORS,
  SIZES,
} from '@hashicorp/design-system-components/components/hds/dropdown/toggle/button';

const CARBON_SIZES = ['xs', 'sm', 'md', 'lg'] as const;

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
          <D.Interactive @href="#">Lorem, ipsum dolor sit amet consectetur.</D.Interactive>
          <D.Interactive @href="#">Option 1</D.Interactive>
          <D.Interactive @href="#">Option 2</D.Interactive>
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
        <ShwFlex @direction="column" as |SF|>
          <SF.Item @label="Carbon Menu Button">
            <cds-menu-button label="Select item" size="md">
              <cds-menu size="md">
                <cds-menu-item
                  label="Lorem, ipsum dolor sit amet
                consectetur."
                ></cds-menu-item>
                <cds-menu-item label="Option 1"></cds-menu-item>
                <cds-menu-item label="Option 2"></cds-menu-item>
                <cds-menu-item label="Option 3"></cds-menu-item>
                <cds-menu-item-divider></cds-menu-item-divider>
                <cds-menu-item label="Danger action" kind="danger">
                  <svg
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    slot="render-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  ><path
                      d="M12,24a4,4,0,1,1,4-4A4.0042,4.0042,0,0,1,12,24Zm0-6a2,2,0,1,0,2,2A2.0023,2.0023,0,0,0,12,18Z"
                    ></path><path
                      d="M30,6a4.0042,4.0042,0,0,0-4-4,3.949,3.949,0,0,0-1.8537.4768L7.7571,10.9579A9.9921,9.9921,0,1,0,21.066,24.1929l8.49-16.3994A3.9491,3.9491,0,0,0,30,6ZM26,4a2,2,0,1,1-2,2A2.0023,2.0023,0,0,1,26,4ZM22.0194,5.8083C22.0163,5.8732,22,5.9343,22,6a4.0042,4.0042,0,0,0,4,4c.0645,0,.1245-.016.1882-.019l-4.3318,8.3617a10.0168,10.0168,0,0,0-8.2158-8.1962ZM12,28a8,8,0,1,1,8-8A8.0092,8.0092,0,0,1,12,28Z"
                    ></path></svg>
                </cds-menu-item>
              </cds-menu>
            </cds-menu-button>
          </SF.Item>
        </ShwFlex>
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
          <D.Interactive @href="#">Option 1</D.Interactive>
          <D.Interactive @href="#">Option 2</D.Interactive>
          <D.Interactive @href="#">Option 3</D.Interactive>
        </HdsDropdown>
      </:theming>
      <:reference>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item @label="Carbon Menu Button">
            <cds-menu-button label="Select item" size="md">
              <cds-menu>
                <cds-menu-item
                  label="Lorem, ipsum dolor sit amet
                consectetur."
                ></cds-menu-item>
                <cds-menu-item label="Option 1"></cds-menu-item>
                <cds-menu-item label="Option 2"></cds-menu-item>
                <cds-menu-item label="Option 3"></cds-menu-item>
              </cds-menu>
            </cds-menu-button>
          </SF.Item>
          <SF.Item @label="Carbon Dropdown">
            <cds-dropdown label="Select item" size="md">
              <cds-dropdown-item value="option-0">Lorem, ipsum dolor sit amet
                consectetur.</cds-dropdown-item>
              <cds-dropdown-item value="option-1">Option 1</cds-dropdown-item>
              <cds-dropdown-item value="option-2">Option 2</cds-dropdown-item>
              <cds-dropdown-item value="option-3">Option 3</cds-dropdown-item>
            </cds-dropdown>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>Base elements</ShwTextH2>

    <ShwTextH3>Toggle with text</ShwTextH3>

    <ShwTextH4>Sizes</ShwTextH4>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        {{#each COLORS as |color|}}
          <ShwFlex as |SF|>
            {{#each SIZES as |size|}}
              <SF.Item @label="{{capitalize color}} {{size}}">
                <ShwFlex @direction="column" as |SF|>
                  <SF.Item>
                    <HdsDropdownToggleButton
                      @color={{color}}
                      @text="Select item"
                      @size={{size}}
                    />
                  </SF.Item>
                </ShwFlex>
              </SF.Item>
            {{/each}}

            <SF.Item @label="{{capitalize color}} full width">
              <ShwOutliner {{style width="300px"}}>
                <HdsDropdownToggleButton
                  @isFullWidth={{true}}
                  @text="Select item"
                  @color={{color}}
                />
              </ShwOutliner>
            </SF.Item>
          </ShwFlex>
        {{/each}}
      </:theming>
      <:reference>
        <ShwFlex as |SF|>
          {{#each CARBON_SIZES as |size|}}
            <SF.Item>
              <cds-menu-button
                label="{{capitalize size}} menu button"
                size={{size}}
              >
                <cds-menu>
                  <cds-menu-item
                    label="Lorem, ipsum dolor sit amet
                  consectetur."
                  ></cds-menu-item>
                  <cds-menu-item label="Option 1"></cds-menu-item>
                  <cds-menu-item label="Option 2"></cds-menu-item>
                  <cds-menu-item label="Option 3"></cds-menu-item>
                </cds-menu>
              </cds-menu-button>
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH4>Content</ShwTextH4>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        {{#each COLORS as |color|}}
          <ShwFlex as |SF|>
            {{#each SIZES as |size|}}
              <SF.Item @label="{{capitalize color}} {{size}}">
                <ShwFlex @direction="column" as |SF|>
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
                  @text="Tgl"
                  @icon="hexagon"
                  @count="1"
                  @badge="Bdg"
                  @badgeIcon="hexagon"
                  disabled
                />
              </SF.Item>
            {{else}}
              <SF.Item @label="{{capitalize state}} state">
                <HdsDropdownToggleButton
                  @text="Tgl"
                  @icon="hexagon"
                  @count="1"
                  @badge="Bdg"
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

    <ShwTextH3>Dropdown Header and Footer</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item @label="Generic header and footer">
            <div class="hds-dropdown__content">
              <HdsDropdownHeader @hasDivider={{true}}>
                <ShwPlaceholder
                  @text="generic header content"
                  @width="200"
                  @height="36"
                  @background="hsl(197, 100%, 75%, 0.2)"
                />
              </HdsDropdownHeader>
              <ul class="hds-dropdown__list">
                {{#each GENERIC_ITEMS}}
                  <HdsDropdownListItemGeneric>
                    <ShwPlaceholder
                      @text="generic item content"
                      @height="36"
                      @background="hsl(197, 100%, 75%, 0.2)"
                    />
                  </HdsDropdownListItemGeneric>
                {{/each}}
              </ul>
              <HdsDropdownFooter @hasDivider={{true}}>
                <ShwPlaceholder
                  @text="generic footer content"
                  @width="200"
                  @height="36"
                  @background="hsl(197, 100%, 75%, 0.2)"
                />
              </HdsDropdownFooter>
            </div>
          </SF.Item>

          <SF.Item @label="Input and Button Set">
            <div class="hds-dropdown__content">
              <HdsDropdownHeader @hasDivider={{true}}>
                <HdsFormTextInputBase
                  @type="search"
                  placeholder="Narrow results"
                />
              </HdsDropdownHeader>
              <ul class="hds-dropdown__list">
                {{#each ORGANIZATIONS as |org|}}
                  <HdsDropdownListItemInteractive @route="page-components">
                    {{org}}
                  </HdsDropdownListItemInteractive>
                {{/each}}
              </ul>
              <HdsDropdownFooter @hasDivider={{true}}>
                <HdsButtonSet>
                  <HdsButton
                    @text="Apply"
                    @isFullWidth={{true}}
                    @size="small"
                  />
                  <HdsButton
                    @text="Cancel"
                    @color="secondary"
                    @isFullWidth={{true}}
                    @size="small"
                  />
                </HdsButtonSet>
              </HdsDropdownFooter>
            </div>
          </SF.Item>

          <SF.Item @label="Input and Link, fixed height list">
            <div class="hds-dropdown__content" {{style maxHeight="190px"}}>
              <HdsDropdownHeader @hasDivider={{true}}>
                <HdsFormTextInputBase
                  @type="search"
                  placeholder="Narrow results"
                />
              </HdsDropdownHeader>
              <ul class="hds-dropdown__list">
                {{#each ORGANIZATIONS as |org|}}
                  <HdsDropdownListItemInteractive @route="page-components">
                    {{org}}
                  </HdsDropdownListItemInteractive>
                {{/each}}
              </ul>
              <HdsDropdownFooter @hasDivider={{true}}>
                <HdsLinkStandalone
                  @icon="plus"
                  @text="Add organization"
                  @href="#"
                />
              </HdsDropdownFooter>
            </div>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>List Item Title / Description / Separator</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
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
      </:theming>

      <:reference>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item @label="Carbon Divider">
            <cds-menu-item-divider></cds-menu-item-divider>
          </SF.Item>
        </ShwFlex>
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
                  Interactive
                </HdsDropdownListItemInteractive>

                <HdsDropdownListItemCheckmark @selected={{true}}>
                  Checkmark
                </HdsDropdownListItemCheckmark>

                <HdsDropdownListItemCheckbox>
                  Checkbox
                </HdsDropdownListItemCheckbox>

                <HdsDropdownListItemRadio>
                  Radio
                </HdsDropdownListItemRadio>

                <HdsDropdownListItemCopyItem @text="Copy Item" />

                <HdsDropdownListItemGeneric>
                  <span
                    class="hds-text hds-typography-body-200 hds-font-weight-medium hds-dropdown-list-item__interactive-text"
                  >
                    Generic
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

    <ShwTextH3>List Item Interactive</ShwTextH3>

    <ShwTextH4>Colors & states</ShwTextH4>

    <ShwCarbonizationComparisonGrid>
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
                          @icon="settings"
                          @trailingIcon="external-link"
                          @color={{color}}
                          mock-state-value={{state}}
                          as |I|
                        >
                          {{state}}
                          <I.Badge @text="Badge" />
                        </HdsDropdownListItemInteractive>
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

        <cds-menu-button label="With icons" size="md">
          <cds-menu>
            <cds-menu-item label="Default action">
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                slot="render-icon"
                width="16"
                height="16"
                viewBox="0 0 32 32"
                aria-hidden="true"
              ><path
                  d="M12,24a4,4,0,1,1,4-4A4.0042,4.0042,0,0,1,12,24Zm0-6a2,2,0,1,0,2,2A2.0023,2.0023,0,0,0,12,18Z"
                ></path><path
                  d="M30,6a4.0042,4.0042,0,0,0-4-4,3.949,3.949,0,0,0-1.8537.4768L7.7571,10.9579A9.9921,9.9921,0,1,0,21.066,24.1929l8.49-16.3994A3.9491,3.9491,0,0,0,30,6ZM26,4a2,2,0,1,1-2,2A2.0023,2.0023,0,0,1,26,4ZM22.0194,5.8083C22.0163,5.8732,22,5.9343,22,6a4.0042,4.0042,0,0,0,4,4c.0645,0,.1245-.016.1882-.019l-4.3318,8.3617a10.0168,10.0168,0,0,0-8.2158-8.1962ZM12,28a8,8,0,1,1,8-8A8.0092,8.0092,0,0,1,12,28Z"
                ></path></svg>
            </cds-menu-item>
            <cds-menu-item label="Danger action" kind="danger">
              <svg
                focusable="false"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                slot="render-icon"
                width="16"
                height="16"
                viewBox="0 0 32 32"
                aria-hidden="true"
              ><path
                  d="M12,24a4,4,0,1,1,4-4A4.0042,4.0042,0,0,1,12,24Zm0-6a2,2,0,1,0,2,2A2.0023,2.0023,0,0,0,12,18Z"
                ></path><path
                  d="M30,6a4.0042,4.0042,0,0,0-4-4,3.949,3.949,0,0,0-1.8537.4768L7.7571,10.9579A9.9921,9.9921,0,1,0,21.066,24.1929l8.49-16.3994A3.9491,3.9491,0,0,0,30,6ZM26,4a2,2,0,1,1-2,2A2.0023,2.0023,0,0,1,26,4ZM22.0194,5.8083C22.0163,5.8732,22,5.9343,22,6a4.0042,4.0042,0,0,0,4,4c.0645,0,.1245-.016.1882-.019l-4.3318,8.3617a10.0168,10.0168,0,0,0-8.2158-8.1962ZM12,28a8,8,0,1,1,8-8A8.0092,8.0092,0,0,1,12,28Z"
                ></path></svg>
            </cds-menu-item>
          </cds-menu>
        </cds-menu-button>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>List Item Checkmark</ShwTextH3>

    <ShwTextH4>States</ShwTextH4>

    <ShwCarbonizationComparisonGrid>
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

    <ShwTextH3>List Item Checkbox</ShwTextH3>

    <ShwTextH4>States</ShwTextH4>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex as |SF|>
          <SF.Item @label="Default">
            <div class="hds-dropdown__content">
              <ul class="hds-dropdown__list">
                {{#each STATES as |state|}}
                  <HdsDropdownListItemCheckbox mock-state-value={{state}}>
                    {{state}}
                  </HdsDropdownListItemCheckbox>
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

    <ShwTextH3>List Item Radio</ShwTextH3>

    <ShwTextH4>States</ShwTextH4>

    <ShwCarbonizationComparisonGrid>
      <:theming>
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

    <ShwDivider @level={{2}} />

    <ShwTextH3>List Item Copy Item</ShwTextH3>

    <ShwTextH4>States</ShwTextH4>

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
            {{/each}}
          </ul>
        </div>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
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
  </section>
</template>;

export default DropdownCarbonizationIndex;
