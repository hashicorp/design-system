/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';
import { array, concat } from '@ember/helper';
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

const TOGGLE_STATES = ['default', 'hover', 'active', 'focus', 'disabled'];
const ITEM_STATES = ['default', 'hover', 'focus', 'active'];
const GENERIC_ITEMS = ['1', '2', '3'];
const ORGANIZATIONS = ['Organization A', 'Organization B', 'Organization C'];

import { COLORS as ITEM_INTERACTIVE_COLORS } from '@hashicorp/design-system-components/components/hds/dropdown/list-item/interactive';

import {
  COLORS,
  SIZES,
} from '@hashicorp/design-system-components/components/hds/dropdown/toggle/button';

const CARBON_SIZES = ['xs', 'sm', 'md'] as const;

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
          <D.Interactive @icon="user" @href="#">User</D.Interactive>
          <D.Interactive @icon="users" @href="#">User group</D.Interactive>
          <D.Separator />
          <D.Interactive
            @color="critical"
            @icon="trash"
            @href="#"
          >Delete</D.Interactive>
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
          <SF.Item>
            <cds-menu-button label="Select item" size="md">
              <cds-menu size="md">
                <cds-menu-item
                  label="Lorem, ipsum dolor sit amet
                consectetur."
                ></cds-menu-item>
                <cds-menu-item label="User"><svg
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    slot="render-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  ><path
                      d="M8,2c1.4,0,2.5,1.1,2.5,2.5S9.4,7,8,7S5.5,5.9,5.5,4.5S6.6,2,8,2 M8,1C6.1,1,4.5,2.6,4.5,4.5S6.1,8,8,8s3.5-1.6,3.5-3.5	S9.9,1,8,1z"
                    ></path><path
                      d="M13,15h-1v-2.5c0-1.4-1.1-2.5-2.5-2.5h-3C5.1,10,4,11.1,4,12.5V15H3v-2.5C3,10.6,4.6,9,6.5,9h3c1.9,0,3.5,1.6,3.5,3.5V15z"
                    ></path></svg></cds-menu-item>
                <cds-menu-item label="User group"><svg
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
                      d="M31,30H29V27a3,3,0,0,0-3-3H22a3,3,0,0,0-3,3v3H17V27a5,5,0,0,1,5-5h4a5,5,0,0,1,5,5Z"
                    ></path><path
                      d="M24,12a3,3,0,1,1-3,3,3,3,0,0,1,3-3m0-2a5,5,0,1,0,5,5A5,5,0,0,0,24,10Z"
                    ></path><path
                      d="M15,22H13V19a3,3,0,0,0-3-3H6a3,3,0,0,0-3,3v3H1V19a5,5,0,0,1,5-5h4a5,5,0,0,1,5,5Z"
                    ></path><path
                      d="M8,4A3,3,0,1,1,5,7,3,3,0,0,1,8,4M8,2a5,5,0,1,0,5,5A5,5,0,0,0,8,2Z"
                    ></path></svg></cds-menu-item>
                <cds-menu-item-divider></cds-menu-item-divider>
                <cds-menu-item label="Delete" kind="danger">
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
                  ><path d="M12 12H14V24H12z" /><path
                      d="M18 12H20V24H18z"
                    /><path
                      d="M4,6V8H6V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V8h2V6ZM8,28V8H24V28Z"
                    /><path d="M12 2H20V4H12z" /></svg>
                </cds-menu-item>
              </cds-menu>
            </cds-menu-button>
          </SF.Item>
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH4>Closest Carbon equivalent</ShwTextH4>

    <ShwCarbonizationComparisonGrid
      @label="with minimal features & matchToggleWidth=true"
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
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>Base elements</ShwTextH2>

    <ShwTextH3>Toggle with text</ShwTextH3>

    <ShwTextH4>Colors &amp; sizes</ShwTextH4>

    <ShwCarbonizationComparisonGrid @layout="side-by-side">
      <:theming>
        {{#each COLORS as |color|}}
          <ShwFlex @direction="column" as |SF|>
            {{#each SIZES as |size|}}
              <SF.Item>
                <HdsDropdownToggleButton
                  @color={{color}}
                  @text="Lorem ipsum"
                  @size={{size}}
                />
              </SF.Item>
            {{/each}}
          </ShwFlex>
        {{/each}}
      </:theming>
      <:reference>
        <ShwFlex @direction="column" as |SF|>
          {{#each CARBON_SIZES as |size|}}
            <SF.Item>
              <cds-menu-button label="Lorem ipsum" size={{size}}>
                <cds-menu>
                  <cds-menu-item label="Dolor"></cds-menu-item>
                </cds-menu>
              </cds-menu-button>
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH4>Content</ShwTextH4>

    <ShwCarbonizationComparisonGrid @layout="side-by-side">
      <:theming>
        {{#each COLORS as |color|}}
          <ShwFlex @direction="column" as |SF|>
            {{#each SIZES as |size|}}
              <SF.Item>
                <ShwFlex @direction="column" as |SF|>
                  <SF.Item>
                    <HdsDropdownToggleButton
                      @icon="hexagon"
                      @count="12"
                      @color={{color}}
                      @text="Lorem ipsum"
                      @size={{size}}
                    />
                  </SF.Item>
                  <SF.Item>
                    <HdsDropdownToggleButton
                      @color={{color}}
                      @text="Lorem ipsum"
                      @size={{size}}
                      @badge="Badge"
                      @badgeIcon="hexagon"
                    />
                  </SF.Item>
                </ShwFlex>
              </SF.Item>
            {{/each}}
          </ShwFlex>
        {{/each}}
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @entity="variant" @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH4>isFullWidth</ShwTextH4>

    <ShwCarbonizationComparisonGrid @layout="side-by-side">
      <:theming>
        {{#each COLORS as |color|}}
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <ShwOutliner {{style width="300px"}}>
                <HdsDropdownToggleButton
                  @isFullWidth={{true}}
                  @text="Lorem ipsum"
                  @color={{color}}
                />
              </ShwOutliner>
            </SF.Item>
            <SF.Item>
              <ShwOutliner {{style width="300px"}}>
                <HdsDropdownToggleButton
                  @isFullWidth={{true}}
                  @text="Lorem ipsum"
                  @color={{color}}
                  @badge="Badge"
                  @badgeIcon="hexagon"
                />
              </ShwOutliner>
            </SF.Item>
            <SF.Item>
              <ShwOutliner {{style width="300px"}}>
                <HdsDropdownToggleButton
                  @icon="hexagon"
                  @count="12"
                  @isFullWidth={{true}}
                  @text="Lorem ipsum"
                  @color={{color}}
                />
              </ShwOutliner>
            </SF.Item>
          </ShwFlex>
        {{/each}}
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @entity="variant" @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Toggle with icon/image</ShwTextH3>

    <ShwCarbonizationComparisonGrid @layout="side-by-side">
      <:theming>
        <ShwFlex as |SF|>
          {{#each SIZES as |size|}}
            <SF.Item>
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
            <SF.Item>
              <HdsDropdownToggleIcon
                @imageSrc="/assets/images/avatar.png"
                @text="user menu"
                @size={{size}}
              />
            </SF.Item>
          {{/each}}

          <SF.Item>
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
    {{#each COLORS as |color|}}
      <ShwTextBody>{{capitalize color}}</ShwTextBody>
      {{#each TOGGLE_STATES as |state|}}
        <ShwCarbonizationComparisonGrid
          @label="{{capitalize state}} "
          @hideThemeLabels={{true}}
          @hideCarbonLabels={{true}}
        >
          <:theming>
            <ShwFlex as |SF|>
              <SF.Item>
                {{#if (eq state "disabled")}}
                  <HdsDropdownToggleButton
                    @text="Tgl"
                    @icon="hexagon"
                    @count="1"
                    @badge="Bdg"
                    @badgeIcon="hexagon"
                    @color={{color}}
                    disabled
                  />
                {{else}}
                  <HdsDropdownToggleButton
                    @text="Tgl"
                    @icon="hexagon"
                    @count="1"
                    @badge="Bdg"
                    @badgeIcon="hexagon"
                    @color={{color}}
                    mock-state-value={{state}}
                  />
                {{/if}}
              </SF.Item>
            </ShwFlex>
          </:theming>
          <:reference>
            <pre>TODO: static image here</pre>
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}
    {{/each}}

    <ShwTextH4>Icon/Image Toggle states</ShwTextH4>

    {{#each TOGGLE_STATES as |state|}}
      <ShwCarbonizationComparisonGrid
        @label="{{capitalize state}}"
        @hideThemeLabels={{true}}
        @hideCarbonLabels={{true}}
      >
        <:theming>
          <ShwFlex @gap="0.75rem" as |SF|>
            {{#if (eq state "disabled")}}
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
            {{else}}
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
            {{/if}}
          </ShwFlex>
        </:theming>
        <:reference>
          <pre>TODO: static image here</pre>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH3>Dropdown Header and Footer</ShwTextH3>

    <ShwCarbonizationComparisonGrid @label="Generic header and footer">
      <:theming>
        <div class="hds-dropdown__content">
          <HdsDropdownHeader @hasDivider={{true}}>
            <ShwPlaceholder
              @text="generic header content"
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
              @height="36"
              @background="hsl(197, 100%, 75%, 0.2)"
            />
          </HdsDropdownFooter>
        </div>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="Input and Button Set">
      <:theming>
        <div class="hds-dropdown__content">
          <HdsDropdownHeader @hasDivider={{true}}>
            <HdsFormTextInputBase @type="search" placeholder="Narrow results" />
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
              <HdsButton @text="Apply" @isFullWidth={{true}} @size="small" />
              <HdsButton
                @text="Cancel"
                @color="secondary"
                @isFullWidth={{true}}
                @size="small"
              />
            </HdsButtonSet>
          </HdsDropdownFooter>
        </div>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="Input and Link, fixed height list">
      <:theming>
        <div class="hds-dropdown__content" {{style maxHeight="190px"}}>
          <HdsDropdownHeader @hasDivider={{true}}>
            <HdsFormTextInputBase @type="search" placeholder="Narrow results" />
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
                  <ShwPlaceholder @text="generic content" @height="30" />
                </HdsDropdownListItemGeneric>
              </ul>
            </div>
          </SF.Item>
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>List Item Interactive</ShwTextH3>

    <ShwTextH4>Colors &amp; states</ShwTextH4>

    {{#each ITEM_INTERACTIVE_COLORS as |color|}}
      <ShwTextBody>{{concat (capitalize color) " color"}}</ShwTextBody>
      <ShwCarbonizationComparisonGrid>
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <div class="hds-dropdown__content">
                <ul class="hds-dropdown__list">
                  {{#each ITEM_STATES as |state|}}
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
        </:theming>
        <:reference>
          <pre>TODO: static image here</pre>
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH3>List Item Checkmark</ShwTextH3>

    <ShwTextH4>States</ShwTextH4>

    {{#let (array false true) as |bools|}}
      {{#each bools as |bool|}}
        <ShwCarbonizationComparisonGrid @label={{if bool "Selected" "Base"}}>
          <:theming>
            <div class="hds-dropdown__content">
              <ul
                class="hds-dropdown__list"
                role="listbox"
                aria-label="Default"
              >
                {{#each ITEM_STATES as |state|}}
                  <HdsDropdownListItemCheckmark
                    mock-state-value={{state}}
                    @selected={{bool}}
                  >
                    {{state}}
                  </HdsDropdownListItemCheckmark>
                {{/each}}
                <HdsDropdownListItemCheckmark
                  mock-state-value="disabled"
                  disabled
                  @selected={{bool}}
                >
                  disabled
                </HdsDropdownListItemCheckmark>
              </ul>
            </div>
          </:theming>
          <:reference as |R|>
            <R.NoEquivalent @isCompact={{true}} />
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}
    {{/let}}

    <ShwDivider @level={{2}} />

    <ShwTextH3>List Item Checkbox</ShwTextH3>

    <ShwTextH4>States</ShwTextH4>

    {{#let (array false true) as |bools|}}
      {{#each bools as |bool|}}
        <ShwCarbonizationComparisonGrid @label={{if bool "Checked" "Base"}}>
          <:theming>
            <div class="hds-dropdown__content">
              <ul class="hds-dropdown__list">
                {{#each ITEM_STATES as |state|}}
                  <HdsDropdownListItemCheckbox
                    checked={{bool}}
                    mock-state-value={{state}}
                  >
                    {{state}}
                  </HdsDropdownListItemCheckbox>
                {{/each}}
                <HdsDropdownListItemCheckbox
                  checked={{bool}}
                  mock-state-value="disabled"
                  disabled
                >
                  disabled
                </HdsDropdownListItemCheckbox>
              </ul>
            </div>
          </:theming>
          <:reference as |R|>
            <R.NoEquivalent @isCompact={{true}} />
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}
    {{/let}}

    <ShwDivider @level={{2}} />

    <ShwTextH3>List Item Radio</ShwTextH3>

    <ShwTextH4>States</ShwTextH4>

    {{#let (array false true) as |bools|}}
      {{#each bools as |bool|}}
        <ShwCarbonizationComparisonGrid @label={{if bool "Checked" "Base"}}>
          <:theming>
            <div class="hds-dropdown__content">
              <ul class="hds-dropdown__list">
                {{#each ITEM_STATES as |state|}}
                  <HdsDropdownListItemRadio
                    checked={{bool}}
                    mock-state-value={{state}}
                  >
                    {{state}}
                  </HdsDropdownListItemRadio>
                {{/each}}
                <HdsDropdownListItemRadio
                  checked={{bool}}
                  mock-state-value="disabled"
                  disabled
                >
                  disabled
                </HdsDropdownListItemRadio>
              </ul>
            </div>
          </:theming>
          <:reference as |R|>
            <R.NoEquivalent @isCompact={{true}} />
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}
    {{/let}}

    <ShwDivider @level={{2}} />

    <ShwTextH3>List Item Copy Item</ShwTextH3>

    <ShwTextH4>States</ShwTextH4>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <div class="hds-dropdown__content">
          <ul class="hds-dropdown__list">
            {{#each ITEM_STATES as |state|}}
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
