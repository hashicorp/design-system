/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';
import { array, hash } from '@ember/helper';
import PowerSelect from 'ember-power-select/components/power-select';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwDivider from 'showcase/components/shw/divider';
import ShwOutliner from 'showcase/components/shw/outliner';
import FormSuperSelectCodeFragmentWithSingleBaseElement from 'showcase/components/page-components/form/super-select/code-fragments/with-single-base-element';
import FormSuperSelectCodeFragmentWithMultipleBaseElement from 'showcase/components/page-components/form/super-select/code-fragments/with-multiple-base-element';
import FilterBarCodeFragmentWithGenericContent from 'showcase/components/page-components/filter-bar/code-fragments/with-generic-content';
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
  HdsButtonSet,
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
  HdsFilterBarTabs,
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
  HdsAdvancedTableTd,
  HdsTableTr,
  HdsTag,
  HdsTextBody,
  HdsTooltipButton,
} from '@hashicorp/design-system-components/components';
import HdsAdvancedTableThResizeHandle from '@hashicorp/design-system-components/components/hds/advanced-table/th-resize-handle';
import HdsAdvancedTableThReorderHandle from '@hashicorp/design-system-components/components/hds/advanced-table/th-reorder-handle';
import HdsAdvancedTableThContextMenu from '@hashicorp/design-system-components/components/hds/advanced-table/th-context-menu';

import { TYPES as ACCORDION_TYPES } from '@hashicorp/design-system-components/components/hds/accordion/item/index';
import {
  COLORS as BUTTON_COLORS,
  SIZES as BUTTON_SIZES,
} from '@hashicorp/design-system-components/components/hds/button/index';
import { THEMES as APPFOOTER_THEMES } from '@hashicorp/design-system-components/components/hds/app-footer/index';
import { COLORS as DROPDOWN_TOGGLE_COLORS } from '@hashicorp/design-system-components/components/hds/dropdown/toggle/button';
import { COLORS as DROPDOWN_ITEM_INTERACTIVE_COLORS } from '@hashicorp/design-system-components/components/hds/dropdown/list-item/interactive';
import { SIZES as TABS_SIZES } from '@hashicorp/design-system-components/components/hds/tabs/index';
import { COLORS as TAG_COLORS } from '@hashicorp/design-system-components/components/hds/tag/index';

const CODE_BLOCK_SNIPPET = `def convert_object_to_array(obj)
  arr = obj.keys
           .map { |key| [key, obj[key]] }
           .flatten
           .sort
  return arr
end

def assert_objects_equal(actual, expected, test_name)
  actual_str = convert_object_to_array(actual).to_s
  expected_str = convert_object_to_array(expected).to_s
  puts 'ACTUAL: #{actual_str}  EXPECTED: #{expected_str}'
  if actual_str == expected_str
    puts 'passed'
  else
    puts 'FAILED [#{test_name}] Expected #{expected}, but got #{actual}'
  end
end`;

const CODE_EDITOR_SNIPPET = `package main

import 'fmt'

func main() {
  res = 'Lorem ipsum dolor sit amet'
  fmt.Println(res)
}`;

const POWERSELECT_OPTIONS: string[] = ['foo', 'bar', 'baz', 'abc', 'xyz'];
const POWERSELECT_SINGLE_SELECTED: string[] = ['foo'];
const POWERSELECT_MULTIPLE_SELECTED: string[] = ['foo', 'baz', 'xyz'];

const SubSectionComponents: TemplateOnlyComponent = <template>
  <ShwTextH2>Components with focus ring</ShwTextH2>

  <ShwTextH4 @tag="h3">Accordion</ShwTextH4>

  {{#each ACCORDION_TYPES as |type|}}
    <ShwFlex @label={{type}} @direction="column" @gap="2rem" as |SF|>
      <SF.Item>
        {{#let (array false true) as |booleans|}}
          <ShwGrid @columns={{4}} @gap="2rem" as |SG|>
            {{#each booleans as |containsInteractive|}}
              {{#each booleans as |isOpen|}}
                <SG.Item>
                  <HdsAccordionItem
                    @containsInteractive={{containsInteractive}}
                    @isOpen={{isOpen}}
                    @type={{type}}
                    mock-state-value="focus"
                    mock-state-selector=".hds-accordion-item__button"
                  >
                    <:toggle>Item</:toggle>
                    <:content>
                      <ShwPlaceholder @text="generic content" @height="40" />
                    </:content>
                  </HdsAccordionItem>
                </SG.Item>
              {{/each}}
            {{/each}}
          </ShwGrid>
        {{/let}}
      </SF.Item>
    </ShwFlex>
  {{/each}}

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">AppFooter</ShwTextH4>

  <ShwFlex @direction="column" as |SF|>
    {{#each APPFOOTER_THEMES as |theme|}}
      <SF.Item>
        <div class="shw-component-app-footer-wrapper">
          <HdsAppFooter
            @theme={{theme}}
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
        </div>
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">AppHeader</ShwTextH4>

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

  <ShwTextH4 @tag="h3">AppSideNav</ShwTextH4>

  <ul class="shw-component-sim-app-side-nav-list-link-wrapper">
    <HdsAppSideNavListBackLink
      @text="Back to parent page"
      @href="#"
      mock-state-value="focus"
    />
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

  <ShwTextH4 @tag="h3">Breadcrumb</ShwTextH4>

  <HdsBreadcrumb aria-label="breadcrumb in focus state example">
    <HdsBreadcrumbItem
      @text="One"
      @icon="org"
      mock-state-value="focus"
      mock-state-selector="button"
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
      mock-state-selector="button"
    />
    <HdsBreadcrumbItem @text="Five" />
    <HdsBreadcrumbItem @text="Curr" @current={{true}} />
  </HdsBreadcrumb>

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">Button</ShwTextH4>
  <ShwGrid @columns={{5}} @gap="1rem" as |SG|>
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

  <ShwTextH4 @tag="h3">ButtonSet</ShwTextH4>
  <ShwFlex @direction="column" as |SF|>
    <SF.Item mock-state-value="focus" mock-state-selector="a, button">
      <HdsButtonSet>
        <HdsButton @text="Submit" type="submit" />
        <HdsButton
          @text="Cancel"
          @color="secondary"
          @href="https://hashicorp.com"
        />
      </HdsButtonSet>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">CodeBlock</ShwTextH4>

  <HdsCodeBlock
    @value={{CODE_BLOCK_SNIPPET}}
    @language="ruby"
    @maxHeight="200px"
    @ariaLabel="maxHeight='200px'"
    @hasCopyButton={{true}}
    @hasLineNumbers={{true}}
    @highlightLines="4, 12"
    mock-state-value="focus"
    mock-state-selector=".hds-code-block__code, .hds-code-block__copy-button, .hds-code-block__height-toggle-button"
    mock-state-delay="200"
    as |CB|
  >
    <CB.Title>Lorem ipsum</CB.Title>
  </HdsCodeBlock>

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">CodeEditor</ShwTextH4>

  {{! TODO understand if we can apply the focus at runtime }}
  <HdsCodeEditor
    @ariaLabel="With complex content"
    @language="go"
    @value={{CODE_EDITOR_SNIPPET}}
    @hasFullScreenButton={{true}}
    @hasCopyButton={{true}}
    mock-state-value="focus"
    mock-state-selector=".hds-code-editor__header-actions .hds-code-editor__button, .hds-code-editor__header-generic .hds-button"
    as |CE|
  >
    <CE.Title>Lorem ipsum</CE.Title>
    <CE.Description>Sit amet consectetur</CE.Description>
    <CE.Generic class="my-code-editor-custom-content">
      <HdsButton @text="Custom action" @size="small" />
      <HdsButton
        @text="Search"
        @icon="search"
        @isIconOnly={{true}}
        @size="small"
      />
    </CE.Generic>
  </HdsCodeEditor>

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

  <ShwTextH4 @tag="h3">FilterBar</ShwTextH4>
  <ShwTextBody>Complete</ShwTextBody>
  <div mock-state-value="focus" mock-state-selector="button,input">
    <FilterBarCodeFragmentWithGenericContent
      @hasSearch={{true}}
      @hasActionsDropdown={{true}}
      @hasFilters={{true}}
    />
  </div>

  <ShwTextBody>Tabs</ShwTextBody>
  <ShwOutliner class="shw-component-filter-bar-tabs-wrapper">
    <HdsFilterBarTabs @selectedTabIndex={{0}} as |T|>
      <T.Tab mock-state-value="focus" mock-state-selector="button">Tab 1</T.Tab>
      <T.Tab>Tab 2</T.Tab>
      <T.Tab mock-state-value="focus" mock-state-selector="button">Tab 3</T.Tab>
      <T.Panel>
        <ShwPlaceholder @text="Content one" />
      </T.Panel>
      <T.Panel>
        <ShwPlaceholder @text="Content two" />
      </T.Panel>
      <T.Panel>
        <ShwPlaceholder @text="Content three" />
      </T.Panel>
    </HdsFilterBarTabs>
  </ShwOutliner>

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">Form</ShwTextH4>

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

  <ShwTextBody>PowerSelect overrides</ShwTextBody>
  <ShwFlex as |SF|>
    <SF.Item @label="Single selection">
      <div class="hds-power-select">
        <PowerSelect
          @options={{POWERSELECT_OPTIONS}}
          @selected={{POWERSELECT_SINGLE_SELECTED}}
          @onChange={{NOOP}}
          @renderInPlace={{true}}
          {{! special case, we apply directly the mock classname }}
          class="mock-focus"
          as |option|
        >
          {{option}}
        </PowerSelect>
      </div>
    </SF.Item>
    <SF.Item @label="Multiple selection">
      <div class="hds-power-select">
        <PowerSelect
          @multiple={{true}}
          @options={{POWERSELECT_OPTIONS}}
          @selected={{POWERSELECT_MULTIPLE_SELECTED}}
          @onChange={{NOOP}}
          @renderInPlace={{true}}
          {{! special case, we apply directly the mock classname }}
          class="mock-focus"
          as |option|
        >
          {{option}}
        </PowerSelect>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">Link</ShwTextH4>

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

  <ShwTextH4 @tag="h3">Pagination</ShwTextH4>
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

  <ShwTextH4 @tag="h3">Reveal</ShwTextH4>

  <HdsRevealToggleButton @text="More options" mock-state-value="focus" />

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">RichTooltip</ShwTextH4>

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
            @type="outlined"
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

  <ShwTextH4 @tag="h3">StepperNav</ShwTextH4>

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

  <ShwTextBody>Th</ShwTextBody>
  <ShwFlex @direction="column" as |SF|>
    {{#let (array "" "button") as |selectors|}}
      {{#each selectors as |selector|}}
        <SF.Item>
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
                  @column={{(hash
                    isSortable=true key="lorem" label="Lorem ipsum"
                  )}}
                  @tooltip="Here is more information"
                  mock-state-value="focus"
                  mock-state-selector={{selector}}
                >
                  Lorem ipsum
                </HdsAdvancedTableTh>
              </div>
            </div>
            <div class="hds-advanced-table__tbody" role="rowgroup">
              <div class="hds-advanced-table__tr" role="row">
                <HdsAdvancedTableTd>&nbsp;</HdsAdvancedTableTd>
              </div>
            </div>
          </div>
        </SF.Item>
      {{/each}}
    {{/let}}
    <SF.Item>
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
              Lorem
            </HdsAdvancedTableTh>
          </div>
        </div>
        <div class="hds-advanced-table__tbody" role="rowgroup">
          <HdsAdvancedTableTd>&nbsp;</HdsAdvancedTableTd>
        </div>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwTextBody>ThSelectable</ShwTextBody>
  <ShwFlex @direction="column" as |SF|>
    {{#let (array "" "input") as |selectors|}}
      {{#each selectors as |selector|}}
        <SF.Item>
          <ShwFlex @direction="row" @gap="0.5rem" as |SF|>
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
                          mock-state-selector={{selector}}
                        />
                        <HdsAdvancedTableTh>Lorem</HdsAdvancedTableTh>
                      </div>
                    </div>
                    <div class="hds-advanced-table__tbody" role="rowgroup">
                      <div
                        class="hds-advanced-table__tr hds-advanced-table__tr--last-row"
                        role="row"
                      >
                        <HdsAdvancedTableThSelectable
                          @selectionScope="row"
                          @isSelected={{bool}}
                          mock-state-value="focus"
                          mock-state-selector={{selector}}
                        />
                        <HdsAdvancedTableTd>Ipsum</HdsAdvancedTableTd>
                      </div>
                    </div>
                  </div>
                </SF.Item>
              {{/each}}
            {{/let}}
          </ShwFlex>
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

  <ShwTextBody>ThContextMenu</ShwTextBody>
  <HdsAdvancedTableThContextMenu
    @column={{(hash key="lorem" label="Lorem")}}
    @isFirstColumn={{false}}
    @isFirstNonStickyColumn={{true}}
    @isLastColumn={{false}}
    @hasResizableColumns={{true}}
    mock-state-value="focus"
    mock-state-selector="button"
  />

  <ShwTextBody>Td</ShwTextBody>
  <div
    class="hds-advanced-table hds-advanced-table--density-medium shw-component-table-container"
    role="grid"
    {{style gridTemplateColumns="1fr"}}
  >
    <div class="hds-advanced-table__thead" role="rowgroup">
      <div class="hds-advanced-table__tr" role="row">
        <HdsAdvancedTableTh
          @isExpandable={{false}}
          @hasExpandAllButton={{false}}
        >Lorem ipsum</HdsAdvancedTableTh>
      </div>
    </div>
    <div class="hds-advanced-table__tbody" role="rowgroup">
      <div
        class="hds-advanced-table__tr hds-advanced-table__tr--last-row"
        role="row"
      >
        <HdsAdvancedTableTd mock-state-value="focus">Dolor sit amet</HdsAdvancedTableTd>
      </div>
    </div>
  </div>

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

  <ShwTextH4 @tag="h3">Tag</ShwTextH4>
  {{#each TAG_COLORS as |color|}}
    <ShwTextBody>{{capitalize color}}</ShwTextBody>
    <ShwFlex @direction="column" as |SF|>
      <SF.Item>
        <HdsTag
          @color={{color}}
          @text="My link tag"
          @href="#"
          mock-state-value="focus"
          mock-state-selector="a"
        />
      </SF.Item>
      <SF.Item>
        <HdsTag
          @color={{color}}
          @href="#"
          @text="My link tag"
          @onDismiss={{NOOP}}
          mock-state-value="focus"
          mock-state-selector="button"
        />
      </SF.Item>
      <SF.Item>
        <HdsTag
          @color={{color}}
          @href="#"
          @text="My link tag"
          @onDismiss={{NOOP}}
          mock-state-value="focus"
          mock-state-selector="a"
        />
      </SF.Item>
      <SF.Item>
        <HdsTag
          @color={{color}}
          @href="#"
          @text="My link tag"
          @onDismiss={{NOOP}}
          mock-state-value="focus"
          mock-state-selector="a, button"
        />
      </SF.Item>
      <SF.Item>
        <HdsTag
          @text="This is a very long text that should go on multiple lines"
          @tooltipPlacement="bottom"
          mock-state-value="focus"
          mock-state-selector="button"
          mock-state-delay="200"
        />
      </SF.Item>
      <SF.Item>
        <HdsTag
          @text="This is a very long text that should go on multiple lines"
          @tooltipPlacement="bottom"
          @onDismiss={{NOOP}}
          mock-state-value="focus"
          mock-state-selector=".hds-tooltip-button"
          mock-state-delay="200"
        />
      </SF.Item>
      <SF.Item>
        <HdsTag
          @text="This is a very long text that should go on multiple lines"
          @tooltipPlacement="bottom"
          @onDismiss={{NOOP}}
          mock-state-value="focus"
          mock-state-selector=".hds-tag__dismiss, .hds-tooltip-button"
          mock-state-delay="200"
        />
      </SF.Item>
    </ShwFlex>
  {{/each}}

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">Tooltip</ShwTextH4>

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
