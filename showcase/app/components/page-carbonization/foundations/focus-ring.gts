/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import style from 'ember-style-modifier';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';
import { array, concat, hash } from '@ember/helper';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';
import FormSuperSelectCodeFragmentWithSingleBaseElement from 'showcase/components/page-components/form/super-select/code-fragments/with-single-base-element';
import FormSuperSelectCodeFragmentWithMultipleBaseElement from 'showcase/components/page-components/form/super-select/code-fragments/with-multiple-base-element';
import NOOP from 'showcase/utils/noop';

import {
  HdsAccordionItem,
  HdsAppFooter,
  HdsAppHeader,
  HdsAppHeaderHomeLink,
  HdsAppSideNavListBackLink,
  HdsAppSideNavListLink,
  HdsAppSideNavToggleButton,
  HdsBadge,
  HdsBreadcrumb,
  HdsBreadcrumbItem,
  HdsBreadcrumbTruncation,
  HdsButton,
  HdsCodeEditor,
  HdsCopyButton,
  HdsCopySnippet,
  HdsDismissButton,
  HdsDropdown,
  HdsDropdownToggleButton,
  HdsDropdownToggleIcon,
  HdsDropdownListItemInteractive,
  HdsDropdownListItemCheckmark,
  HdsDropdownListItemCheckbox,
  HdsDropdownListItemRadio,
  HdsFormCheckboxBase,
  HdsFormFileInputBase,
  HdsFormMaskedInputBase,
  HdsFormRadioBase,
  HdsFormRadioCard,
  HdsFormSelectBase,
  HdsFormTextareaBase,
  HdsFormTextInputBase,
  HdsFormToggleBase,
  HdsIcon,
  HdsLinkInline,
  HdsLinkStandalone,
  HdsPaginationNavArrow,
  HdsPaginationNavNumber,
  HdsRevealToggleButton,
  HdsRichTooltip,
  HdsStepperNav,
  HdsTabsTab,
  HdsTable,
  HdsTableTh,
  HdsTableThSelectable,
  HdsTableThSort,
  HdsAdvancedTableTh,
  HdsAdvancedTableThSelectable,
  HdsAdvancedTableThSort,
  HdsAdvancedTableTd,
  HdsTableTr,
  HdsTag,
  HdsTextBody,
  HdsTooltipButton,
} from '@hashicorp/design-system-components/components';
import HdsAdvancedTableThResizeHandle from '@hashicorp/design-system-components/components/hds/advanced-table/th-resize-handle';
import HdsAdvancedTableThReorderHandle from '@hashicorp/design-system-components/components/hds/advanced-table/th-reorder-handle';

import {
  COLORS as BUTTON_COLORS,
  SIZES as BUTTON_SIZES,
} from '@hashicorp/design-system-components/components/hds/button/index';
import { COLORS as DROPDOWN_TOGGLE_COLORS } from '@hashicorp/design-system-components/components/hds/dropdown/toggle/button';
import { COLORS as DROPDOWN_ITEM_INTERACTIVE_COLORS } from '@hashicorp/design-system-components/components/hds/dropdown/list-item/interactive';
import { SIZES as TABS_SIZES } from '@hashicorp/design-system-components/components/hds/tabs/index';
import { COLORS as TAG_COLORS } from '@hashicorp/design-system-components/components/hds/tag/index';

const CODE_EDITOR_SNIPPET = `package main
import "fmt"
func main() {
  fmt.Println("Hello, world!")
}`;

const FocusRingCarbonization: TemplateOnlyComponent = <template>
  {{pageTitle "Focus ring"}}

  <ShwTextH1>Focus Ring - Carbonization</ShwTextH1>

  <section>
    <ShwTextH2>Base "focus ring" effect</ShwTextH2>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <div
              class="hds-focus-ring-action-box-shadow"
              {{style width="fit-content"}}
            >
              <ShwPlaceholder
                @width="100"
                @height="100"
                @background="transparent"
              />
            </div>
          </SF.Item>
          <SF.Item>
            <div
              class="hds-focus-ring-action-box-shadow"
              {{style border-radius="5px" width="fit-content"}}
            >
              <ShwPlaceholder
                @width="100"
                @height="100"
                @background="transparent"
              />
            </div>
          </SF.Item>
          <SF.Item>
            <div
              class="hds-focus-ring-critical-box-shadow"
              {{style border-radius="5px" width="fit-content"}}
            >
              <ShwPlaceholder
                @width="100"
                @height="100"
                @background="transparent"
              />
            </div>
          </SF.Item>
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>Components with focus ring</ShwTextH2>

    <ShwTextH4 tag="h3">Accordion</ShwTextH4>
    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" @gap="2rem" as |SF|>
          {{#let (array false true) as |booleans|}}
            {{#each booleans as |containsInteractive|}}
              {{#each booleans as |isOpen|}}
                <SF.Item>
                  <HdsAccordionItem
                    @containsInteractive={{containsInteractive}}
                    @isOpen={{isOpen}}
                    @type="card"
                    mock-state-value="focus"
                    mock-state-selector="{{if
                      containsInteractive
                      '.hds-accordion-item__button'
                      '.hds-accordion-item__button'
                    }}"
                  >
                    {{! '.hds-disclosure-primitive__toggle' }}
                    <:toggle>Item</:toggle>
                    <:content>
                      <ShwPlaceholder @text="generic content" @height="40" />
                    </:content>
                  </HdsAccordionItem>
                </SF.Item>
              {{/each}}
            {{/each}}
          {{/let}}
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH4 tag="h3">AppFooter</ShwTextH4>
    <ShwCarbonizationComparisonGrid>
      <:theming>
        <HdsAppFooter
          mock-state-value="focus"
          mock-state-selector="button, a"
          as |AF|
        >
          <AF.StatusLink @status="operational" />
          <AF.Link
            @href="https://cloud.hashicorp.com/docs/changelog"
            @icon="logs"
            @iconPosition="leading"
          >Changelog</AF.Link>
          <AF.Link @href="#">Lorem</AF.Link>
          <AF.Link @href="#">Ipsum</AF.Link>
        </HdsAppFooter>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH4 tag="h3">AppHeader</ShwTextH4>
    <ShwCarbonizationComparisonGrid>
      <:theming>
        <div mock-state-value="focus" mock-state-selector="button, a">
          <HdsAppHeader @hasA11yRefocus={{false}}>
            <:logo>
              <HdsAppHeaderHomeLink
                @icon="hashicorp"
                @text="HashiCorp home menu"
                @isIconOnly={{true}}
                @href="#"
              />
            </:logo>
            <:globalActions>
              <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
                <dd.ToggleButton @text="org" @icon="org" />
                <dd.Checkmark>
                  Lorem
                </dd.Checkmark>
              </HdsDropdown>
            </:globalActions>
            <:utilityActions>
              <HdsButton @icon="search" @isIconOnly={{true}} @text="Search" />
              <HdsDropdown @enableCollisionDetection={{true}} as |dd|>
                <dd.ToggleIcon @icon="user" @text="user menu" />
                <dd.Title @text="Signed In" />
                <dd.Description @text="email@domain.com" />
                <dd.Interactive @href="#">Account Settings</dd.Interactive>
              </HdsDropdown>
            </:utilityActions>
          </HdsAppHeader>
        </div>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH4 tag="h3">AppSideNav</ShwTextH4>
    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
          <HdsAppSideNavListBackLink @text="Back to parent page" @href="#" />
          <HdsAppSideNavListLink @text="Packer" @icon="packer" @href="#" />
          <HdsAppSideNavListLink
            @text="Terraform"
            @icon="terraform"
            @count="3"
            @href="#"
            mock-state-value="focus"
          />
          <HdsAppSideNavListLink @text="Vagrant" @icon="vagrant" @href="#" />
          <HdsAppSideNavListLink
            @text="Boundary"
            @icon="boundary"
            @href="#"
            @hasSubItems={{true}}
            @isActive={{true}}
            mock-state-value="focus"
          />
          <HdsAppSideNavListLink @text="Waypoint" @icon="waypoint" @href="#" />
        </ul>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid>
      <:theming>
        <div class="shw-component-sim-toggle-button">
          <HdsAppSideNavToggleButton
            aria-label="Close menu"
            @icon="chevrons-left"
            mock-state-value="focus"
          />
        </div>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH4 tag="h3">Breadcrumb</ShwTextH4>
    <ShwCarbonizationComparisonGrid>
      <:theming>
        <HdsBreadcrumb aria-label="breadcrumb in focus state example">
          <HdsBreadcrumbItem
            @text="One"
            @icon="org"
            mock-state-value="focus"
            mock-state-selector="a"
          />
          <HdsBreadcrumbTruncation
            mock-state-value="focus"
            mock-state-selector="button"
          >
            <HdsBreadcrumbItem @text="Two" />
            <HdsBreadcrumbItem @text="Three" />
          </HdsBreadcrumbTruncation>
          <HdsBreadcrumbItem
            @text="Four"
            mock-state-value="focus"
            mock-state-selector="a"
          />
          <HdsBreadcrumbItem
            @text="Curr"
            @current={{true}}
            mock-state-value="focus"
            mock-state-selector="a"
          />
        </HdsBreadcrumb>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH4 tag="h3">Button</ShwTextH4>
    {{#each BUTTON_COLORS as |color|}}
      <ShwCarbonizationComparisonGrid @label={{capitalize color}}>
        <:theming>
          <ShwFlex @direction="column" @gap="1rem" as |SG|>
            {{#each BUTTON_SIZES as |size|}}
              <SG.Item>
                <HdsButton
                  @icon="plus"
                  @text="Lorem"
                  @size={{size}}
                  @color={{color}}
                  mock-state-value="focus"
                />
              </SG.Item>
            {{/each}}
          </ShwFlex>
        </:theming>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH4 @tag="h3">CodeEditor</ShwTextH4>
    <ShwCarbonizationComparisonGrid>
      <:theming>
        {{! TODO understand how we can apply the focus at runtime }}
        <HdsCodeEditor
          @ariaLabel="CodeEditor demo"
          @language="go"
          @value={{CODE_EDITOR_SNIPPET}}
          class="cm-focused"
        />
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH4 @tag="h3">CopyButton</ShwTextH4>
    <ShwCarbonizationComparisonGrid>
      <:theming>
        <HdsCopyButton
          @text="Copy"
          mock-state-value="focus"
          @targetToCopy="#targetToCopy"
        />
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <input
      type="hidden"
      id="targetToCopy"
      value="This is some text stored in a hidden &lt;input&gt; element"
    />

    <ShwDivider @level={{2}} />

    <ShwTextH4 @tag="h3">CopySnippet</ShwTextH4>
    <ShwCarbonizationComparisonGrid>
      <:theming>
        <HdsCopySnippet @textToCopy="Lorem ipsum" mock-state-value="focus" />
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH4 @tag="h3">DismissButton</ShwTextH4>
    <ShwCarbonizationComparisonGrid>
      <:theming>
        <HdsDismissButton mock-state-value="focus" />
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH4 @tag="h3">Dropdown</ShwTextH4>
    <ShwCarbonizationComparisonGrid @label="ToggleButton">
      <:theming>
        <ShwFlex @direction="column" @gap="1rem" as |SF|>
          {{#each DROPDOWN_TOGGLE_COLORS as |color|}}
            <SF.Item @label="{{capitalize color}}">
              <HdsDropdownToggleButton
                @icon="hexagon"
                @badge="Sit"
                @badgeIcon="hexagon"
                @text="Lorem"
                @color={{color}}
                mock-state-value="focus"
              />
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="ToggleIcon">
      <:theming>
        <ShwFlex @direction="column" @gap="1rem" as |SF|>
          <SF.Item @label="Icon">
            <HdsDropdownToggleIcon
              @icon="more-horizontal"
              @text="overflow menu"
              @hasChevron={{false}}
              @isOpen={{true}}
              mock-state-value="focus"
            />
          </SF.Item>
          <SF.Item @label="Icon+chevron">
            <HdsDropdownToggleIcon
              @icon="user"
              @text="focus"
              mock-state-value="focus"
            />
          </SF.Item>
          <SF.Item @label="Avatar+chevron">
            <HdsDropdownToggleIcon
              @text="focus"
              @imageSrc="/assets/images/avatar.png"
              mock-state-value="focus"
            />
          </SF.Item>
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Item > Interactive">
      <:theming>
        {{#each DROPDOWN_ITEM_INTERACTIVE_COLORS as |color|}}
          <ShwFlex @direction="column" as |SF|>
            <SF.Item @label={{capitalize color}}>
              <ShwFlex as |SF|>
                <SF.Item>
                  <div class="hds-dropdown__content">
                    <ul class="hds-dropdown__list">
                      <HdsDropdownListItemInteractive @color={{color}}>
                        Lorem
                      </HdsDropdownListItemInteractive>
                      <HdsDropdownListItemInteractive
                        @color={{color}}
                        mock-state-value="focus"
                      >
                        focus
                      </HdsDropdownListItemInteractive>
                      <HdsDropdownListItemInteractive @color={{color}}>
                        Ipsum
                      </HdsDropdownListItemInteractive>
                      <HdsDropdownListItemInteractive
                        @icon={{if (eq color "critical") "trash" "settings"}}
                        @color={{color}}
                        mock-state-value="focus"
                      >
                        focus with icon
                      </HdsDropdownListItemInteractive>
                      <HdsDropdownListItemInteractive @color={{color}}>
                        Dolor
                      </HdsDropdownListItemInteractive>
                      <HdsDropdownListItemInteractive
                        @icon={{if (eq color "critical") "trash" "settings"}}
                        @color={{color}}
                        mock-state-value="focus"
                      >
                        focus with a longer text string that should wrap
                      </HdsDropdownListItemInteractive>
                      <HdsDropdownListItemInteractive @color={{color}}>
                        Sit amet
                      </HdsDropdownListItemInteractive>
                    </ul>
                  </div>
                </SF.Item>
              </ShwFlex>
            </SF.Item>
          </ShwFlex>
        {{/each}}
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Item > Checkmark">
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <div class="hds-dropdown__content">
              <ul
                class="hds-dropdown__list"
                role="listbox"
                aria-label="Default"
              >
                <HdsDropdownListItemCheckmark mock-state-value="focus">
                  Lorem ipsum
                </HdsDropdownListItemCheckmark>
              </ul>
            </div>
          </SF.Item>
          <SF.Item>
            <div class="hds-dropdown__content">
              <ul
                class="hds-dropdown__list"
                role="listbox"
                aria-label="Selected"
              >
                <HdsDropdownListItemCheckmark
                  mock-state-value="focus"
                  @selected={{true}}
                >
                  Lorem ipsum
                </HdsDropdownListItemCheckmark>
              </ul>
            </div>
          </SF.Item>
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Item > Checkbox">
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <div class="hds-dropdown__content">
              <ul
                class="hds-dropdown__list"
                role="listbox"
                aria-label="Default"
              >
                <HdsDropdownListItemCheckbox mock-state-value="focus">
                  Lorem ipsum
                </HdsDropdownListItemCheckbox>
              </ul>
            </div>
          </SF.Item>
          <SF.Item>
            <div class="hds-dropdown__content">
              <ul
                class="hds-dropdown__list"
                role="listbox"
                aria-label="Selected"
              >
                <HdsDropdownListItemCheckbox mock-state-value="focus" checked>
                  Lorem ipsum
                </HdsDropdownListItemCheckbox>
              </ul>
            </div>
          </SF.Item>
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Item > Radio">
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <div class="hds-dropdown__content">
              <ul
                class="hds-dropdown__list"
                role="listbox"
                aria-label="Default"
              >
                <HdsDropdownListItemRadio mock-state-value="focus">
                  Lorem ipsum
                </HdsDropdownListItemRadio>
              </ul>
            </div>
          </SF.Item>
          <SF.Item>
            <div class="hds-dropdown__content">
              <ul
                class="hds-dropdown__list"
                role="listbox"
                aria-label="Selected"
              >
                <HdsDropdownListItemRadio mock-state-value="focus" checked>
                  Lorem ipsum
                </HdsDropdownListItemRadio>
              </ul>
            </div>
          </SF.Item>
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH4 tag="h3">Form</ShwTextH4>
    <ShwCarbonizationComparisonGrid @label="Checkbox">
      <:theming>
        <ShwFlex mock-state-value="focus" mock-state-selector="input" as |SF|>
          <SF.Item>
            <HdsFormCheckboxBase aria-label="Checkbox" />
          </SF.Item>
          <SF.Item>
            <HdsFormCheckboxBase
              checked="checked"
              aria-label="Checked checkbox"
            />
          </SF.Item>
          <SF.Item>
            <HdsFormCheckboxBase
              indeterminate={{true}}
              aria-label="Indeterminate checkbox"
            />
          </SF.Item>
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="FileInput">
      <:theming>
        <HdsFormFileInputBase
          mock-state-value="focus"
          aria-label="focused file input example"
        />
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="MaskedInput">
      <:theming>
        {{#let (array "input" "textarea") as |types|}}
          {{#each types as |type|}}
            <ShwFlex @direction="column" as |SF|>
              {{#let (array "base" "invalid" "readonly") as |variants|}}
                {{#each variants as |variant|}}
                  <SF.Item
                    mock-state-value="focus"
                    mock-state-selector={{type}}
                  >
                    <HdsFormMaskedInputBase
                      readonly={{if (eq variant "readonly") "readonly"}}
                      @value="Lorem ipsum dolor"
                      @isInvalid={{if (eq variant "invalid") true}}
                      @isMultiline={{if (eq type "textarea") true false}}
                      aria-label="focused {{variant}} masked input example"
                    />
                  </SF.Item>
                {{/each}}
              {{/let}}
            </ShwFlex>
          {{/each}}
        {{/let}}
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Radio">
      <:theming>
        <ShwFlex mock-state-value="focus" mock-state-selector="input" as |SF|>
          <SF.Item>
            <HdsFormRadioBase aria-label="Radio" />
          </SF.Item>
          <SF.Item>
            <HdsFormRadioBase checked="checked" aria-label="Checked radio" />
          </SF.Item>
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="RadioCard">
      <:theming>
        {{!  }}
        <ShwGrid @columns={{1}} @gap="2rem" as |SG|>
          {{#let (array false true) as |booleans|}}
            {{#each booleans as |bool|}}
              <SG.Item mock-state-value="focus" mock-state-selector="label">
                <HdsFormRadioCard @checked={{bool}} as |R|>
                  <R.Icon @name="hexagon" />
                  <R.Label>Label</R.Label>
                  <R.Description>Description</R.Description>
                </HdsFormRadioCard>
              </SG.Item>
            {{/each}}
          {{/let}}
        </ShwGrid>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Select">
      <:theming>
        {{#let (array "single" "multiple") as |types|}}
          {{#each types as |type|}}
            <ShwFlex @direction="column" as |SF|>
              {{#let (array "base" "invalid") as |variants|}}
                {{#each variants as |variant|}}
                  <SF.Item
                    mock-state-value="focus"
                    mock-state-selector="select"
                  >
                    <HdsFormSelectBase
                      aria-label="form"
                      @isInvalid={{if (eq variant "invalid") true}}
                      multiple={{if (eq type "multiple") true null}}
                      as |F|
                    >
                      <F.Options>
                        <option selected>Lorem ipsum dolor</option>
                        <option>Sine qua non est</option>
                      </F.Options>
                    </HdsFormSelectBase>
                  </SF.Item>
                {{/each}}
              {{/let}}
            </ShwFlex>
          {{/each}}
        {{/let}}
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="SuperSelect">
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          {{#let (array "base" "invalid") as |variants|}}
            {{#each variants as |variant|}}
              <SF.Item>
                <FormSuperSelectCodeFragmentWithSingleBaseElement
                  @isSelected={{true}}
                  @isInvalid={{if (eq variant "invalid") true}}
                  class="mock-focus"
                />
              </SF.Item>
            {{/each}}
          {{/let}}
        </ShwFlex>
        <ShwFlex @direction="column" as |SF|>
          {{#let (array "base" "invalid") as |variants|}}
            {{#each variants as |variant|}}
              <SF.Item>
                <FormSuperSelectCodeFragmentWithMultipleBaseElement
                  @options="places"
                  @isSelected={{true}}
                  @isInvalid={{if (eq variant "invalid") true}}
                  class="mock-focus"
                />
              </SF.Item>
            {{/each}}
          {{/let}}
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="TextInput">
      <:theming>
        <ShwFlex
          @direction="column"
          mock-state-value="focus"
          mock-state-selector="input"
          as |SF|
        >
          {{#let (array "base" "invalid" "readonly") as |variants|}}
            {{#each variants as |variant|}}
              <SF.Item mock-state-value="focus" mock-state-selector="select">
                <HdsFormTextInputBase
                  aria-label="focused text input example"
                  readonly={{if (eq variant "readonly") "readonly"}}
                  @isInvalid={{if (eq variant "invalid") true}}
                />
              </SF.Item>
              <SF.Item>
                <HdsFormTextInputBase
                  aria-label="focused text input example"
                  @type="date"
                  @value="Lorem ipsum dolor"
                  readonly={{if (eq variant "readonly") "readonly"}}
                  @isInvalid={{if (eq variant "invalid") true}}
                />
              </SF.Item>
              <SF.Item>
                <HdsFormTextInputBase
                  aria-label="focused text input example"
                  @type="time"
                  @value="Lorem ipsum dolor"
                  readonly={{if (eq variant "readonly") "readonly"}}
                  @isInvalid={{if (eq variant "invalid") true}}
                />
              </SF.Item>
            {{/each}}
          {{/let}}
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Textarea">
      <:theming>
        <ShwFlex
          @direction="column"
          mock-state-value="focus"
          mock-state-selector="textarea"
          as |SF|
        >
          {{#let (array "base" "invalid" "readonly") as |variants|}}
            {{#each variants as |variant|}}
              <SF.Item mock-state-value="focus" mock-state-selector="select">
                <HdsFormTextareaBase
                  aria-label="focused textarea example"
                  readonly={{if (eq variant "readonly") "readonly"}}
                  @isInvalid={{if (eq variant "invalid") true}}
                />
              </SF.Item>
            {{/each}}
          {{/let}}
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Toggle">
      <:theming>
        <ShwFlex mock-state-value="focus" mock-state-selector="input" as |SF|>
          <SF.Item>
            <HdsFormToggleBase aria-label="Toggle" />
          </SF.Item>
          <SF.Item>
            <HdsFormToggleBase checked="checked" aria-label="Checked toggle" />
          </SF.Item>
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH4 tag="h3">Link</ShwTextH4>
    <ShwCarbonizationComparisonGrid @label="Inline">
      <:theming>
        <div class="hds-typography-body-300">Lorem
          <HdsLinkInline
            @color="primary"
            @href="#"
            @icon="external-link"
            @iconPosition="trailing"
            mock-state-value="focus"
          >ipsum dolor</HdsLinkInline>
          sit amet
        </div>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Standalone">
      <:theming>
        <HdsLinkStandalone
          @icon="plus"
          @text="Lorem ipsum"
          @size="medium"
          @color="primary"
          @href="#"
          mock-state-value="focus"
        />
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH4 tag="h3">Pagination</ShwTextH4>
    <ShwCarbonizationComparisonGrid @label="Inline">
      <:theming>
        <ShwFlex
          @gap="0.5rem"
          mock-state-value="focus"
          mock-state-selector="button,a"
          as |SF|
        >
          <SF.Item>
            <HdsPaginationNavArrow @direction="prev" />
          </SF.Item>
          <SF.Item>
            <HdsPaginationNavArrow @direction="prev" @showLabel={{false}} />
          </SF.Item>
          <SF.Item>
            <HdsPaginationNavNumber
              @page={{12}}
              @isSelected={{false}}
              @onClick={{NOOP}}
            />
          </SF.Item>
          <SF.Item>
            <HdsPaginationNavNumber
              @page={{34}}
              @isSelected={{true}}
              @onClick={{NOOP}}
            />
          </SF.Item>
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH4 tag="h3">Reveal</ShwTextH4>
    <ShwCarbonizationComparisonGrid>
      <:theming>
        <HdsRevealToggleButton @text="More options" mock-state-value="focus" />
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH4 tag="h3">RichTooltip</ShwTextH4>
    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" mock-state-value="focus" as |SF|>
          <SF.Item @label="block">
            <HdsRichTooltip as |RT|>
              <RT.Toggle
                @text="Lorem ipsum dolor"
                @isInline={{false}}
                @icon="info"
                @size="medium"
                mock-state-value="focus"
              />
              <RT.Bubble>
                <ShwPlaceholder @text="generic content" @height="30" />
              </RT.Bubble>
            </HdsRichTooltip>
          </SF.Item>
          <SF.Item @label="inline">
            <HdsTextBody @size="200" @tag="p" {{style margin-bottom="16px"}}>
              Lorem
              <HdsRichTooltip as |RT|>
                <RT.Toggle
                  @text="ipsum dolor"
                  @isInline={{true}}
                  @icon="info"
                  @size="medium"
                  mock-state-value="focus"
                />
                <RT.Bubble>
                  <ShwPlaceholder @text="generic content" @height="30" />
                </RT.Bubble>
              </HdsRichTooltip>
              sit amet
            </HdsTextBody>
            <HdsTextBody @size="200" @tag="p" {{style margin-bottom="16px"}}>
              Lorem ipsum dolor sit
              <HdsRichTooltip as |RT|>
                <RT.Toggle
                  @text="amet consectetur"
                  @isInline={{true}}
                  @icon="info"
                  @size="medium"
                  mock-state-value="focus"
                />
                <RT.Bubble>
                  <ShwPlaceholder @text="generic content" @height="30" />
                </RT.Bubble>
              </HdsRichTooltip>
              adipisicing elit
            </HdsTextBody>
            <HdsTextBody @size="200" @tag="p">
              Lorem ipsum
              <HdsRichTooltip as |RT|>
                <RT.Toggle
                  @text="dolor sit amet consectetur adipisicing elit"
                  @isInline={{true}}
                  @icon="info"
                  @size="medium"
                  mock-state-value="focus"
                />
                <RT.Bubble>
                  <ShwPlaceholder @text="generic content" @height="30" />
                </RT.Bubble>
              </HdsRichTooltip>
            </HdsTextBody>
          </SF.Item>
          <SF.Item @label="icon">
            <HdsRichTooltip as |RT|>
              <RT.Toggle aria-label="Information" mock-state-value="focus">
                <HdsIcon @name="org" />
              </RT.Toggle>
              <RT.Bubble>
                <ShwPlaceholder @text="generic content" @height="40" />
              </RT.Bubble>
            </HdsRichTooltip>
          </SF.Item>
          <SF.Item @label="badge">
            <HdsRichTooltip as |RT|>
              <RT.Toggle mock-state-value="focus">
                <HdsBadge
                  @text="Lorem ipsum"
                  @color="neutral"
                  @icon="hexagon"
                  type="outlined"
                />
              </RT.Toggle>
              <RT.Bubble>
                <ShwPlaceholder @text="generic content" @height="40" />
              </RT.Bubble>
            </HdsRichTooltip>
          </SF.Item>
          <SF.Item @label="tag">
            <HdsRichTooltip as |RT|>
              <RT.Toggle mock-state-value="focus">
                <HdsTag @text="Lorem ipsum" />
              </RT.Toggle>
              <RT.Bubble>
                <ShwPlaceholder @text="generic content" @height="40" />
              </RT.Bubble>
            </HdsRichTooltip>
          </SF.Item>
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH4 tag="h3">StepperNav</ShwTextH4>
    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item @label="Complete">
            <HdsStepperNav @currentStep={{1}} @ariaLabel="Label" as |S|>
              <S.Step mock-state-value="focus" mock-state-selector="button">
                <:title>Title</:title>
                <:description>Description</:description>
              </S.Step>
              <S.Panel />
            </HdsStepperNav>
          </SF.Item>
          <SF.Item @label="Active">
            <HdsStepperNav @currentStep={{0}} @ariaLabel="Label" as |S|>
              <S.Step mock-state-value="focus" mock-state-selector="button">
                <:title>Title</:title>
                <:description>Description</:description>
              </S.Step>
              <S.Panel />
            </HdsStepperNav>
          </SF.Item>
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH4 @tag="h3">Tabs</ShwTextH4>
    {{#each TABS_SIZES as |size|}}
      <ShwCarbonizationComparisonGrid @label={{capitalize size}}>
        <:theming>
          <div
            class={{concat
              "hds-tabs--size-"
              size
              " shw-component-tabs-selector-example"
            }}
          >
            <ul class="shw-component-tabs-sample-ul-wrapper" role="tablist">
              <HdsTabsTab
                mock-state-value="focus"
                mock-state-selector="button"
              >Lorem ipsum</HdsTabsTab>
            </ul>
            <ul class="shw-component-tabs-sample-ul-wrapper" role="tablist">
              <HdsTabsTab
                class="hds-tabs__tab--is-selected"
                @icon="hexagon"
                @count="10"
                mock-state-value="focus"
                mock-state-selector="button"
              >Lorem ipsum</HdsTabsTab>
              {{! template-lint-disable no-invalid-role }}
              <li class="hds-tabs__tab-indicator" role="presentation"></li>
              {{! template-lint-enable no-invalid-role }}
            </ul>
          </div>
        </:theming>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH4 @tag="h3">Table</ShwTextH4>
    <ShwCarbonizationComparisonGrid @label="ThSort">
      <:theming>
        <HdsTable>
          <:head>
            <HdsTableTr>
              <HdsTableThSort
                mock-state-value="focus"
                mock-state-selector="button"
                @tooltip="Here is more information"
              >
                Lorem ipsum
              </HdsTableThSort>
            </HdsTableTr>
          </:head>
          <:body as |B|>
            <B.Tr>
              <B.Td />
            </B.Tr>
          </:body>
        </HdsTable>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Th">
      <:theming>
        <HdsTable>
          <:head>
            <HdsTableTr>
              <HdsTableTh
                @tooltip="Here is more information"
                mock-state-value="focus"
                mock-state-selector="button"
              >
                Lorem ipsum
              </HdsTableTh>
            </HdsTableTr>
          </:head>
          <:body as |B|>
            <B.Tr>
              <B.Td />
            </B.Tr>
          </:body>
        </HdsTable>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="ThSelectable">
      <:theming>
        <ShwFlex @direction="row" @gap="2rem" as |SF|>
          {{#let (array false true) as |booleans|}}
            {{#each booleans as |bool|}}
              <SF.Item>
                <HdsTable>
                  <:head as |H|>
                    <H.Tr>
                      <HdsTableThSelectable
                        @selectionScope="col"
                        @isSelected={{bool}}
                        mock-state-value="focus"
                        mock-state-selector="input"
                      />
                      <H.Th>Lorem</H.Th>
                    </H.Tr>
                  </:head>
                  <:body as |B|>
                    <B.Tr>
                      <HdsTableThSelectable
                        @selectionScope="row"
                        @isSelected={{bool}}
                        mock-state-value="focus"
                        mock-state-selector="input"
                      />
                      <B.Td>Ipsum</B.Td>
                    </B.Tr>
                  </:body>
                </HdsTable>
              </SF.Item>
            {{/each}}
          {{/let}}
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH4 @tag="h3">AdvancedTable</ShwTextH4>
    <ShwCarbonizationComparisonGrid @label="ThSort">
      <:theming>
        <div
          class="hds-advanced-table"
          role="grid"
          {{style gridTemplateColumns="repeat(1, 1fr)"}}
        >
          <div class="hds-advanced-table__thead" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableThSort
                mock-state-value="focus"
                mock-state-selector="button"
                @tooltip="Here is more information"
              >
                Lorem
              </HdsAdvancedTableThSort>
            </div>
          </div>
          <div class="hds-advanced-table__tbody" role="rowgroup">
            <HdsAdvancedTableTd>&nbsp;</HdsAdvancedTableTd>
          </div>
        </div>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="Th">
      <:theming>
        <div
          class="hds-advanced-table"
          role="grid"
          {{style gridTemplateColumns="1fr"}}
        >
          <div class="hds-advanced-table__thead" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh
                @isExpandable={{true}}
                @hasExpandAllButton={{true}}
                @tooltip="Here is more information"
                mock-state-value="focus"
                mock-state-selector="button"
              >
                Lorem ipsum
              </HdsAdvancedTableTh>
            </div>
          </div>
          <div class="hds-advanced-table__tbody" role="rowgroup">
            <HdsAdvancedTableTd>&nbsp;</HdsAdvancedTableTd>
          </div>
        </div>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="ThSelectable">
      <:theming>
        <ShwFlex @direction="row" @gap="2rem" as |SF|>
          {{#let (array false true) as |booleans|}}
            {{#each booleans as |bool|}}
              <SF.Item>
                <div
                  class="hds-advanced-table hds-advanced-table--density-medium"
                  role="grid"
                  {{style gridTemplateColumns="auto 1fr"}}
                >
                  <div class="hds-advanced-table__thead" role="rowgroup">
                    <div class="hds-advanced-table__tr" role="row">
                      <HdsAdvancedTableThSelectable
                        @selectionScope="col"
                        @isSelected={{bool}}
                        mock-state-value="focus"
                        mock-state-selector="input"
                      />
                      <HdsAdvancedTableTh>Lorem</HdsAdvancedTableTh>
                    </div>
                  </div>
                  <div class="hds-advanced-table__tbody" role="rowgroup">
                    <div class="hds-advanced-table__tr" role="row">
                      <HdsAdvancedTableThSelectable
                        @selectionScope="row"
                        @isSelected={{bool}}
                      />
                      <HdsAdvancedTableTd>Ipsum</HdsAdvancedTableTd>
                    </div>
                  </div>
                </div>
              </SF.Item>
            {{/each}}
          {{/let}}
        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="ThResizeHandle">
      <:theming>
        <div
          class="hds-advanced-table hds-advanced-table--density-medium"
          role="grid"
          {{style gridTemplateColumns="repeat(2, 1fr)"}}
        >
          <div class="hds-advanced-table__thead" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              <div
                class="hds-advanced-table__th hds-advanced-table__th--is-resizable"
                role="columnheader"
              >
                <div class="hds-advanced-table__th-content">
                  <span
                    class="hds-advanced-table__th-content-text hds-typography-body-200 hds-font-weight-semibold"
                  >
                    Lorem
                  </span>
                </div>
                {{! @glint-ignore }}
                <HdsAdvancedTableThResizeHandle mock-state-value="focus" />
              </div>
              <HdsAdvancedTableTh>
                Ipsum
              </HdsAdvancedTableTh>
            </div>
          </div>
        </div>
      </:theming>
    </ShwCarbonizationComparisonGrid>
    <ShwCarbonizationComparisonGrid @label="ThReorderHandle">
      <:theming>
        <div class="shw-component-advanced-table-reorder-handle-container">
          <HdsAdvancedTableThReorderHandle
            mock-state-value="focus"
            {{! @glint-ignore }}
            @column={{(hash foo="bar")}}
            @tableHeight={{110}}
            @onReorderDragStart={{NOOP}}
            @onReorderDragEnd={{NOOP}}
          />
        </div>
      </:theming>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH4 @tag="h3">Tag</ShwTextH4>
    {{#each TAG_COLORS as |color|}}
      <ShwCarbonizationComparisonGrid @label={{capitalize color}}>
        <:theming>
          <HdsTag
            @color={{color}}
            @href="#"
            @text="My link tag"
            @onDismiss={{NOOP}}
            mock-state-value="focus"
            mock-state-selector="button"
          />
        </:theming>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH4 tag="h3">Tooltip</ShwTextH4>
    <ShwCarbonizationComparisonGrid @label="Inline">
      <:theming>
        <ShwFlex
          mock-state-value="focus"
          mock-state-selector="button,a"
          as |SF|
        >
          <SF.Item>
            <HdsTooltipButton
              @text="Here is more information"
              aria-label="Information"
            >
              <HdsIcon @name="info" />
            </HdsTooltipButton>
          </SF.Item>
          <SF.Item>
            <HdsTooltipButton
              @text="Here is more information"
              aria-label="Information"
            >
              <HdsTextBody @tag="p" @size="100">Lorem</HdsTextBody>
            </HdsTooltipButton>
          </SF.Item>
          <SF.Item>
            <HdsTooltipButton
              @text="Here is more information"
              aria-label="Information"
            >
              <HdsBadge @icon="activity" @text="Lorem" />
            </HdsTooltipButton>
          </SF.Item>

        </ShwFlex>
      </:theming>
    </ShwCarbonizationComparisonGrid>

  </section>
</template>;

export default FocusRingCarbonization;
