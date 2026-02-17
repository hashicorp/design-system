/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';
import { array, hash } from '@ember/helper';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwDivider from 'showcase/components/shw/divider';
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
  HdsCodeBlock,
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

const SubSectionComponents: TemplateOnlyComponent = <template>
  <ShwTextH2>Components with focus ring</ShwTextH2>

  <ShwTextH4 tag="h3">Accordion</ShwTextH4>

  <ShwFlex
    @direction="column"
    @gap="2rem"
    class="shw-component-accordion-wrapper"
    as |SF|
  >
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

  <ShwDivider @level={{2}} />

  <ShwTextH4 tag="h3">AppFooter</ShwTextH4>

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

  <ShwDivider @level={{2}} />

  <ShwTextH4 tag="h3">AppHeader</ShwTextH4>

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

  <ShwDivider @level={{2}} />

  <ShwTextH4 tag="h3">AppSideNav</ShwTextH4>

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

  <div class="shw-component-sim-toggle-button">
    <HdsAppSideNavToggleButton
      aria-label="Close menu"
      @icon="chevrons-left"
      mock-state-value="focus"
    />
  </div>

  <ShwDivider @level={{2}} />

  <ShwTextH4 tag="h3">Breadcrumb</ShwTextH4>

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

  <ShwDivider @level={{2}} />

  <ShwTextH4 tag="h3">Button</ShwTextH4>
  <ShwGrid @columns={{4}} @gap="1rem" as |SG|>
    {{#each BUTTON_COLORS as |color|}}
      <SG.Item @label={{capitalize color}}>
        <ShwFlex @direction="column" @gap="1rem" as |SF|>
          {{#each BUTTON_SIZES as |size|}}
            <SF.Item>
              <HdsButton
                @icon="plus"
                @text="Lorem"
                @size={{size}}
                @color={{color}}
                mock-state-value="focus"
              />
            </SF.Item>
          {{/each}}
        </ShwFlex>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">CodeBlock</ShwTextH4>

  <div class="shw-component-code-block-wrapper">
    <span class="shw-component-code-block-display-none" id="test-target">Copy me</span>
    <HdsCodeBlock
      @language="shell-session"
      @hasCopyButton={{true}}
      @ariaLabel="hasCopyButton=true"
      @value="$ brew tap hashicorp/tap"
      mock-state-value="focus"
      mock-state-selector=".hds-code-block__copy-button"
    />
  </div>

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">CodeEditor</ShwTextH4>

  <pre>TODO understand how we can apply the focus at runtime</pre>
  <HdsCodeEditor
    @ariaLabel="CodeEditor demo"
    @language="go"
    @value={{CODE_EDITOR_SNIPPET}}
    class="cm-focused"
  />

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">CopyButton</ShwTextH4>

  <HdsCopyButton
    @text="Copy"
    mock-state-value="focus"
    @targetToCopy="#targetToCopy"
  />

  <input
    type="hidden"
    id="targetToCopy"
    value="This is some text stored in a hidden &lt;input&gt; element"
  />

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">CopySnippet</ShwTextH4>

  <HdsCopySnippet @textToCopy="Lorem ipsum" mock-state-value="focus" />

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">DismissButton</ShwTextH4>

  <HdsDismissButton mock-state-value="focus" />

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">Dropdown</ShwTextH4>

  <ShwTextBody>ToggleButton</ShwTextBody>
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

  <ShwTextBody>ToggleIcon</ShwTextBody>
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

  <ShwTextBody>Item > Interactive</ShwTextBody>
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

  <ShwTextBody>Item > Checkmark</ShwTextBody>
  <ShwFlex @direction="column" as |SF|>
    <SF.Item>
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list" role="listbox" aria-label="Default">
          <HdsDropdownListItemCheckmark mock-state-value="focus">
            Lorem ipsum
          </HdsDropdownListItemCheckmark>
        </ul>
      </div>
    </SF.Item>
    <SF.Item>
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list" role="listbox" aria-label="Selected">
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

  <ShwTextBody>Item > Checkbox</ShwTextBody>
  <ShwFlex @direction="column" as |SF|>
    <SF.Item>
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list" role="listbox" aria-label="Default">
          <HdsDropdownListItemCheckbox mock-state-value="focus">
            Lorem ipsum
          </HdsDropdownListItemCheckbox>
        </ul>
      </div>
    </SF.Item>
    <SF.Item>
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list" role="listbox" aria-label="Selected">
          <HdsDropdownListItemCheckbox mock-state-value="focus" checked>
            Lorem ipsum
          </HdsDropdownListItemCheckbox>
        </ul>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwTextBody>Item > Radio</ShwTextBody>
  <ShwFlex @direction="column" as |SF|>
    <SF.Item>
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list" role="listbox" aria-label="Default">
          <HdsDropdownListItemRadio mock-state-value="focus">
            Lorem ipsum
          </HdsDropdownListItemRadio>
        </ul>
      </div>
    </SF.Item>
    <SF.Item>
      <div class="hds-dropdown__content">
        <ul class="hds-dropdown__list" role="listbox" aria-label="Selected">
          <HdsDropdownListItemRadio mock-state-value="focus" checked>
            Lorem ipsum
          </HdsDropdownListItemRadio>
        </ul>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH4 tag="h3">Form</ShwTextH4>

  <ShwTextBody>Checkbox</ShwTextBody>
  <ShwFlex
    class="shw-component-form-elements-wrapper"
    mock-state-value="focus"
    mock-state-selector="input"
    as |SF|
  >
    <SF.Item>
      <HdsFormCheckboxBase aria-label="Checkbox" />
    </SF.Item>
    <SF.Item>
      <HdsFormCheckboxBase checked="checked" aria-label="Checked checkbox" />
    </SF.Item>
    <SF.Item>
      <HdsFormCheckboxBase
        indeterminate={{true}}
        aria-label="Indeterminate checkbox"
      />
    </SF.Item>
  </ShwFlex>

  <ShwTextBody>FileInput</ShwTextBody>
  <div class="shw-component-form-elements-wrapper">
    <HdsFormFileInputBase
      mock-state-value="focus"
      aria-label="focused file input example"
    />
  </div>

  <ShwTextBody>MaskedInput</ShwTextBody>
  {{#let (array "input" "textarea") as |types|}}
    {{#each types as |type|}}
      <ShwFlex
        @direction="column"
        class="shw-component-form-elements-wrapper"
        as |SF|
      >
        {{#let (array "base" "invalid" "readonly") as |variants|}}
          {{#each variants as |variant|}}
            <SF.Item mock-state-value="focus" mock-state-selector={{type}}>
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

  <ShwTextBody>Radio</ShwTextBody>
  <ShwFlex
    class="shw-component-form-elements-wrapper"
    mock-state-value="focus"
    mock-state-selector="input"
    as |SF|
  >
    <SF.Item>
      <HdsFormRadioBase aria-label="Radio" />
    </SF.Item>
    <SF.Item>
      <HdsFormRadioBase checked="checked" aria-label="Checked radio" />
    </SF.Item>
  </ShwFlex>

  <ShwTextBody>RadioCard</ShwTextBody>
  <ShwGrid
    class="shw-component-form-elements-wrapper"
    @columns={{1}}
    @gap="2rem"
    as |SG|
  >
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

  <ShwTextBody>Select</ShwTextBody>

  {{#let (array "single" "multiple") as |types|}}
    {{#each types as |type|}}
      <ShwFlex
        class="shw-component-form-elements-wrapper"
        @direction="column"
        as |SF|
      >
        {{#let (array "base" "invalid") as |variants|}}
          {{#each variants as |variant|}}
            <SF.Item mock-state-value="focus" mock-state-selector="select">
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

  <ShwTextBody>SuperSelect</ShwTextBody>
  <ShwFlex
    class="shw-component-form-elements-wrapper"
    @direction="column"
    as |SF|
  >
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
  <ShwFlex
    class="shw-component-form-elements-wrapper"
    @direction="column"
    as |SF|
  >
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

  <ShwTextBody>TextInput</ShwTextBody>
  <ShwFlex
    class="shw-component-form-elements-wrapper"
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

  <ShwTextBody>Textarea</ShwTextBody>
  <ShwFlex
    class="shw-component-form-elements-wrapper"
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

  <ShwTextBody>Toggle</ShwTextBody>
  <ShwFlex
    class="shw-component-form-elements-wrapper"
    mock-state-value="focus"
    mock-state-selector="input"
    as |SF|
  >
    <SF.Item>
      <HdsFormToggleBase aria-label="Toggle" />
    </SF.Item>
    <SF.Item>
      <HdsFormToggleBase checked="checked" aria-label="Checked toggle" />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH4 tag="h3">Link</ShwTextH4>

  <ShwTextBody>Inline</ShwTextBody>
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

  <ShwTextBody>Standalone</ShwTextBody>
  <HdsLinkStandalone
    @icon="plus"
    @text="Lorem ipsum"
    @size="medium"
    @color="primary"
    @href="#"
    mock-state-value="focus"
  />

  <ShwDivider @level={{2}} />

  <ShwTextH4 tag="h3">Pagination</ShwTextH4>
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

  <ShwDivider @level={{2}} />

  <ShwTextH4 tag="h3">Reveal</ShwTextH4>

  <HdsRevealToggleButton @text="More options" mock-state-value="focus" />

  <ShwDivider @level={{2}} />

  <ShwTextH4 tag="h3">RichTooltip</ShwTextH4>

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

  <ShwDivider @level={{2}} />

  <ShwTextH4 tag="h3">StepperNav</ShwTextH4>

  <ShwFlex class="shw-component-stepper-wrapper" @direction="column" as |SF|>
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

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">Table</ShwTextH4>

  <ShwTextBody>ThSort</ShwTextBody>
  <HdsTable class="shw-component-table-container">
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

  <ShwTextBody>Th</ShwTextBody>
  <HdsTable class="shw-component-table-container">
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

  <ShwTextBody>ThSelectable</ShwTextBody>
  <ShwFlex @direction="row" @gap="2rem" as |SF|>
    {{#let (array false true) as |booleans|}}
      {{#each booleans as |bool|}}
        <SF.Item>
          <HdsTable class="shw-component-table-container">
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

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">AdvancedTable</ShwTextH4>

  <ShwTextBody>ThSort</ShwTextBody>
  <div
    class="hds-advanced-table shw-component-table-container"
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

  <ShwTextBody>Th</ShwTextBody>
  <div
    class="hds-advanced-table shw-component-table-container"
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

  <ShwTextBody>ThSelectable</ShwTextBody>
  <ShwFlex @direction="row" @gap="2rem" as |SF|>
    {{#let (array false true) as |booleans|}}
      {{#each booleans as |bool|}}
        <SF.Item>
          <div
            class="hds-advanced-table hds-advanced-table--density-medium shw-component-table-container"
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
                  mock-state-value="focus"
                  mock-state-selector="input"
                />
                <HdsAdvancedTableTd>Ipsum</HdsAdvancedTableTd>
              </div>
            </div>
          </div>
        </SF.Item>
      {{/each}}
    {{/let}}
  </ShwFlex>

  <ShwTextBody>ThResizeHandle</ShwTextBody>
  <div
    class="hds-advanced-table hds-advanced-table--density-medium shw-component-table-container"
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

  <ShwTextBody>ThReorderHandle</ShwTextBody>
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

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">Tag</ShwTextH4>
  {{#each TAG_COLORS as |color|}}
    <ShwTextBody>{{capitalize color}}</ShwTextBody>
    <HdsTag
      @color={{color}}
      @href="#"
      @text="My link tag"
      @onDismiss={{NOOP}}
      mock-state-value="focus"
      mock-state-selector="button"
    />
  {{/each}}

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">Tabs</ShwTextH4>
  <ShwFlex as |SF|>
    {{#each TABS_SIZES as |size|}}
      <SF.Item @label={{capitalize size}}>
        <div class="hds-tabs--size-{{size}} shw-component-tabs-wrapper">
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
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH4 tag="h3">Tooltip</ShwTextH4>

  <ShwFlex mock-state-value="focus" mock-state-selector="button,a" as |SF|>
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
</template>;

export default SubSectionComponents;
