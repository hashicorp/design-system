/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, concat, get } from '@ember/helper';
import { eq } from 'ember-truth-helpers';
import { pageTitle } from 'ember-page-title';

import ShwTextH1 from 'showcase/components/shw/text/h1';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwCarbonizationComparisonGrid from 'showcase/components/shw/carbonization/comparison-grid';
import NOOP from 'showcase/utils/noop';

import {
  HdsFilterBar,
  HdsFilterBarAppliedFilters,
  HdsFilterBarActionsDropdown,
  HdsFilterBarTabs,
  HdsFilterBarTabsTab,
  HdsFilterBarFilterGroup,
  HdsFilterBarFilterGroupCheckbox,
  HdsFilterBarFilterGroupRadio,
  HdsFilterBarFilterGroupClearButton,
  HdsFilterBarFilterGroupDate,
  HdsFilterBarFilterGroupNumerical,
  HdsFilterBarFiltersDropdown,
  type HdsFilterBarFilters,
  type HdsFilterBarNumericalFilter,
  type HdsFilterBarDateFilter,
} from '@hashicorp/design-system-components/components';
import { DATE_FILTER_GROUP_TYPES } from '@hashicorp/design-system-components/components/hds/filter-bar/filter-group/date';

const STATES = ['default', 'hover', 'active', 'focus'];

const EMPTY_FILTERS = {} as HdsFilterBarFilters;

const SAMPLE_FILTERS = {
  'multi-select': {
    type: 'multi-select',
    text: 'Multi-select',
    data: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
  },
} as HdsFilterBarFilters;

const SINGLE_SELECT_APPLIED_FILTER = {
  'single-select': {
    type: 'single-select',
    text: 'Single-select',
    data: {
      value: '1',
      label: 'Option 1',
    },
  },
} as HdsFilterBarFilters;

const SAMPLE_FILTERS_LONG = {
  'multi-select': {
    type: 'multi-select',
    text: 'Multi-select',
    data: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4' },
      { value: '5', label: 'Option 5' },
      { value: '6', label: 'Option 6' },
      { value: '7', label: 'Option 7' },
      { value: '8', label: 'Option 8' },
    ],
  },
} as HdsFilterBarFilters;

const DATE_BETWEEN_FILTERS = {
  date: {
    type: 'date',
    data: {
      selector: 'between',
    },
  } as HdsFilterBarDateFilter,
  datetime: {
    type: 'datetime',
    data: {
      selector: 'between',
    },
  } as HdsFilterBarDateFilter,
  time: {
    type: 'time',
    data: {
      selector: 'between',
    },
  } as HdsFilterBarDateFilter,
};

const NUMERICAL_BETWEEN_FILTER = {
  type: 'numerical',
  data: {
    selector: 'between',
  },
} as HdsFilterBarNumericalFilter;

const FilterBarCarbonizationIndex: TemplateOnlyComponent = <template>
  {{pageTitle "FilterBar - Carbonization"}}

  <ShwTextH1>FilterBar - Carbonization</ShwTextH1>

  <section>

    <ShwTextH2>Content</ShwTextH2>

    <ShwTextH3>With search, ActionsDropdown, and ActionsGeneric</ShwTextH3>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        <HdsFilterBar @filters={{EMPTY_FILTERS}} @hasSearch={{true}} as |F|>
          <F.ActionsGeneric>
            <ShwPlaceholder @text="generic content" @height="24" />
          </F.ActionsGeneric>
          <F.ActionsDropdown @width="100px" @height="200px" as |D|>
            <D.Title @text="Title Text" />
            <D.Description @text="Descriptive text goes here." />
            <D.Interactive @href="#">Add</D.Interactive>
            <D.Interactive @href="#">Add More</D.Interactive>
            <D.Separator />
            <D.Interactive
              @icon="trash"
              @color="critical"
            >Delete</D.Interactive>
          </F.ActionsDropdown>
          <F.FiltersDropdown as |D|>
            <D.FilterGroup
              @key="multi-select"
              @text="Multi-select"
              @type="multi-select"
              as |FG|
            >
              <FG.Checkbox @value="1" @label="Option 1" />
              <FG.Checkbox @value="2" @label="Option 2" />
              <FG.Checkbox @value="3" @label="Option 3" />
            </D.FilterGroup>
            <D.FilterGroup
              @key="single-select"
              @text="Single-select"
              @type="single-select"
              as |FG|
            >
              <FG.Radio @value="1" @label="Option 1" />
              <FG.Radio @value="2" @label="Option 2" />
              <FG.Radio @value="3" @label="Option 3" />
            </D.FilterGroup>
            <D.FilterGroup @key="date" @text="Date" @type="date" />
            <D.FilterGroup @key="datetime" @text="Datetime" @type="datetime" />
            <D.FilterGroup @key="time" @text="Time" @type="time" />
            <D.FilterGroup
              @key="numerical"
              @text="Numerical"
              @type="numerical"
            />
          </F.FiltersDropdown>
        </HdsFilterBar>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH3>With applied filters</ShwTextH3>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        <HdsFilterBar @filters={{SAMPLE_FILTERS}} as |F|>
          <F.FiltersDropdown as |D|>
            <D.FilterGroup
              @key="multi-select"
              @text="Multi-select"
              @type="multi-select"
              as |FG|
            >
              <FG.Checkbox @value="1" @label="Option 1" />
              <FG.Checkbox @value="2" @label="Option 2" />
              <FG.Checkbox @value="3" @label="Option 3" />
            </D.FilterGroup>
            <D.FilterGroup
              @key="single-select"
              @text="Single-select"
              @type="single-select"
              as |FG|
            >
              <FG.Radio @value="1" @label="Option 1" />
              <FG.Radio @value="2" @label="Option 2" />
              <FG.Radio @value="3" @label="Option 3" />
            </D.FilterGroup>
            <D.FilterGroup @key="date" @text="Date" @type="date" />
            <D.FilterGroup @key="datetime" @text="Datetime" @type="datetime" />
            <D.FilterGroup @key="time" @text="Time" @type="time" />
            <D.FilterGroup
              @key="numerical"
              @text="Numerical"
              @type="numerical"
            />
          </F.FiltersDropdown>
        </HdsFilterBar>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH3>With applied filters on multiple rows</ShwTextH3>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        <HdsFilterBar @filters={{SAMPLE_FILTERS_LONG}} as |F|>
          <F.FiltersDropdown as |D|>
            <D.FilterGroup
              @key="multi-select"
              @text="Multi-select"
              @type="multi-select"
              as |FG|
            >
              <FG.Checkbox @value="1" @label="Option 1" />
              <FG.Checkbox @value="2" @label="Option 2" />
              <FG.Checkbox @value="3" @label="Option 3" />
              <FG.Checkbox @value="4" @label="Option 4" />
              <FG.Checkbox @value="5" @label="Option 5" />
              <FG.Checkbox @value="6" @label="Option 6" />
              <FG.Checkbox @value="7" @label="Option 7" />
              <FG.Checkbox @value="8" @label="Option 8" />
            </D.FilterGroup>
            <D.FilterGroup
              @key="single-select"
              @text="Single-select"
              @type="single-select"
              as |FG|
            >
              <FG.Radio @value="1" @label="Option 1" />
              <FG.Radio @value="2" @label="Option 2" />
              <FG.Radio @value="3" @label="Option 3" />
            </D.FilterGroup>
            <D.FilterGroup @key="date" @text="Date" @type="date" />
            <D.FilterGroup @key="datetime" @text="Datetime" @type="datetime" />
            <D.FilterGroup @key="time" @text="Time" @type="time" />
            <D.FilterGroup
              @key="numerical"
              @text="Numerical"
              @type="numerical"
            />
          </F.FiltersDropdown>
        </HdsFilterBar>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider />

    <ShwTextH2>BaseElements</ShwTextH2>

    <ShwTextH3>FiltersDropdown</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <HdsFilterBarFiltersDropdown @filters={{EMPTY_FILTERS}} as |D|>
          <D.FilterGroup
            @key="multi-select"
            @text="Multi-select"
            @type="multi-select"
            as |FG|
          >
            <FG.Checkbox @value="1" @label="Option 1" />
            <FG.Checkbox @value="2" @label="Option 2" />
            <FG.Checkbox @value="3" @label="Option 3" />
          </D.FilterGroup>
          <D.FilterGroup
            @key="single-select"
            @text="Single-select"
            @type="single-select"
            as |FG|
          >
            <FG.Radio @value="1" @label="Option 1" />
            <FG.Radio @value="2" @label="Option 2" />
            <FG.Radio @value="3" @label="Option 3" />
          </D.FilterGroup>
        </HdsFilterBarFiltersDropdown>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>ActionsDropdown</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsFilterBarActionsDropdown as |D|>
              <D.Title @text="Title Text" />
              <D.Description @text="Descriptive text goes here." />
              <D.Interactive @href="#">Add</D.Interactive>
              <D.Interactive @href="#">Add More</D.Interactive>
              <D.Separator />
              <D.Interactive
                @icon="trash"
                @color="critical"
              >Delete</D.Interactive>
            </HdsFilterBarActionsDropdown>
          </SF.Item>
          <SF.Item>
            <HdsFilterBarActionsDropdown
              @toggleButtonText="Custom Actions"
              as |D|
            >
              <D.Title @text="Title Text" />
              <D.Description @text="Descriptive text goes here." />
              <D.Interactive @href="#">Add</D.Interactive>
              <D.Interactive @href="#">Add More</D.Interactive>
              <D.Separator />
              <D.Interactive
                @icon="trash"
                @color="critical"
              >Delete</D.Interactive>
            </HdsFilterBarActionsDropdown>
          </SF.Item>
          <SF.Item>
            <HdsFilterBarActionsDropdown @toggleButtonIcon="plus" as |D|>
              <D.Title @text="Title Text" />
              <D.Description @text="Descriptive text goes here." />
              <D.Interactive @href="#">Add</D.Interactive>
              <D.Interactive @href="#">Add More</D.Interactive>
              <D.Separator />
              <D.Interactive
                @icon="trash"
                @color="critical"
              >Delete</D.Interactive>
            </HdsFilterBarActionsDropdown>
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>AppliedFilters</ShwTextH3>

    <ShwCarbonizationComparisonGrid>
      <:theming>
        <HdsFilterBarAppliedFilters @filters={{SINGLE_SELECT_APPLIED_FILTER}} />
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Tabs</ShwTextH3>

    <ShwTextH4>Tabs (composed)</ShwTextH4>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        <HdsFilterBarTabs as |T|>
          <T.Tab>Tab 1</T.Tab>
          <T.Tab>Tab 2</T.Tab>
          <T.Tab>Tab 3</T.Tab>
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
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH4>TabsTab</ShwTextH4>

    {{#each (array "Unselected" "Selected") as |selection|}}
      {{#each STATES as |state|}}
        <ShwCarbonizationComparisonGrid @label={{state}}>
          <:theming>
            <ShwFlex @direction="column" as |SF|>
              <SF.Item>
                <ul
                  class="shw-component-filter-bar-sample-ul-wrapper"
                  role="tablist"
                >
                  <HdsFilterBarTabsTab
                    mock-state-value={{state}}
                    mock-state-selector="button"
                    class={{if
                      (eq selection "Selected")
                      "hds-filter-bar__tabs__tab--is-selected"
                    }}
                  >Tab 1</HdsFilterBarTabsTab>
                </ul>
              </SF.Item>
              <SF.Item>
                <ul
                  class="shw-component-filter-bar-sample-ul-wrapper"
                  role="tablist"
                >
                  <HdsFilterBarTabsTab
                    mock-state-value={{state}}
                    mock-state-selector="button"
                    @numFilters={{1}}
                    class={{if
                      (eq selection "Selected")
                      "hds-filter-bar__tabs__tab--is-selected"
                    }}
                  >Tab 1</HdsFilterBarTabsTab>
                </ul>
              </SF.Item>
              <SF.Item>
                <ul
                  class="shw-component-filter-bar-sample-ul-wrapper"
                  role="tablist"
                >
                  <HdsFilterBarTabsTab
                    mock-state-value={{state}}
                    mock-state-selector="button"
                    @numFilters={{1}}
                    class={{if
                      (eq selection "Selected")
                      "hds-filter-bar__tabs__tab--is-selected"
                    }}
                  >This is a very long text that should go on multiple lines</HdsFilterBarTabsTab>
                </ul>
              </SF.Item>
            </ShwFlex>
          </:theming>
          <:reference as |R|>
            <R.NoEquivalent @isCompact={{true}} />
          </:reference>
        </ShwCarbonizationComparisonGrid>
      {{/each}}
    {{/each}}

    <ShwDivider @level={{2}} />

    <ShwTextH3>FilterGroup</ShwTextH3>

    <ShwTextH4>Single-select</ShwTextH4>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        <HdsFilterBarTabs as |T|>
          <HdsFilterBarFilterGroup
            @key="name"
            @text="Name"
            @type="single-select"
            @tab={{T.Tab}}
            @panel={{T.Panel}}
            @filters={{EMPTY_FILTERS}}
            @onChange={{NOOP}}
            as |FG|
          >
            <FG.Radio @value="1" @label="Option 1" />
            <FG.Radio @value="2" @label="Option 2" />
            <FG.Radio @value="3" @label="Option 3" />
          </HdsFilterBarFilterGroup>
        </HdsFilterBarTabs>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH4>Multi-select</ShwTextH4>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        <HdsFilterBarTabs as |T|>
          <HdsFilterBarFilterGroup
            @key="name"
            @text="Name"
            @type="multi-select"
            @tab={{T.Tab}}
            @panel={{T.Panel}}
            @filters={{EMPTY_FILTERS}}
            @onChange={{NOOP}}
            as |FG|
          >
            <FG.Checkbox @value="1" @label="Option 1" />
            <FG.Checkbox @value="2" @label="Option 2" />
            <FG.Checkbox @value="3" @label="Option 3" />
          </HdsFilterBarFilterGroup>
        </HdsFilterBarTabs>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH4>Numerical</ShwTextH4>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        <HdsFilterBarTabs as |T|>
          <HdsFilterBarFilterGroup
            @key="name"
            @text="Name"
            @type="numerical"
            @tab={{T.Tab}}
            @panel={{T.Panel}}
            @filters={{EMPTY_FILTERS}}
            @onChange={{NOOP}}
          />
        </HdsFilterBarTabs>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH4>Date</ShwTextH4>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        <HdsFilterBarTabs as |T|>
          <HdsFilterBarFilterGroup
            @key="name"
            @text="Name"
            @type="date"
            @tab={{T.Tab}}
            @panel={{T.Panel}}
            @filters={{EMPTY_FILTERS}}
            @onChange={{NOOP}}
          />
        </HdsFilterBarTabs>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH4>Time</ShwTextH4>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        <HdsFilterBarTabs as |T|>
          <HdsFilterBarFilterGroup
            @key="name"
            @text="Name"
            @type="time"
            @tab={{T.Tab}}
            @panel={{T.Panel}}
            @filters={{EMPTY_FILTERS}}
            @onChange={{NOOP}}
          />
        </HdsFilterBarTabs>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH4>Datetime</ShwTextH4>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        <HdsFilterBarTabs as |T|>
          <HdsFilterBarFilterGroup
            @key="name"
            @text="Name"
            @type="datetime"
            @tab={{T.Tab}}
            @panel={{T.Panel}}
            @filters={{EMPTY_FILTERS}}
            @onChange={{NOOP}}
          />
        </HdsFilterBarTabs>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH4>Generic</ShwTextH4>

    <ShwCarbonizationComparisonGrid @layout="column">
      <:theming>
        <HdsFilterBarTabs as |T|>
          <HdsFilterBarFilterGroup
            @key="name"
            @text="Name"
            @type="generic"
            @tab={{T.Tab}}
            @panel={{T.Panel}}
            @filters={{EMPTY_FILTERS}}
            @onChange={{NOOP}}
            as |FG|
          >
            <FG.Generic>
              <ShwPlaceholder @text="Generic content" @height="50" />
            </FG.Generic>
          </HdsFilterBarFilterGroup>
        </HdsFilterBarTabs>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwTextH4>Base elements</ShwTextH4>

    <ShwCarbonizationComparisonGrid @label="Checkbox">
      <:theming>
        <HdsFilterBarFilterGroupCheckbox
          @name="checkbox"
          @label="Label"
          @value="value"
        />
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="Radio">
      <:theming>
        <HdsFilterBarFilterGroupRadio
          @name="radio"
          @label="Label"
          @value="value"
        />
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    {{#each DATE_FILTER_GROUP_TYPES as |type|}}
      <ShwCarbonizationComparisonGrid
        @layout="side-by-side"
        @label="Date, type: {{type}}"
      >
        <:theming>
          <ShwFlex @direction="column" as |SF|>
            <SF.Item>
              <HdsFilterBarFilterGroupDate
                @key={{concat type "-base"}}
                @type={{type}}
              />
            </SF.Item>
            <SF.Item>
              <HdsFilterBarFilterGroupDate
                @key={{concat type "-selector-between"}}
                @type={{type}}
                @keyFilter={{get DATE_BETWEEN_FILTERS type}}
              />
            </SF.Item>
          </ShwFlex>
        </:theming>
        <:reference as |R|>
          <R.NoEquivalent @isCompact={{true}} />
        </:reference>
      </ShwCarbonizationComparisonGrid>
    {{/each}}

    <ShwCarbonizationComparisonGrid @layout="side-by-side" @label="Numerical">
      <:theming>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item>
            <HdsFilterBarFilterGroupNumerical @key="numerical-base" />
          </SF.Item>
          <SF.Item>
            <HdsFilterBarFilterGroupNumerical
              @key="numerical-selector-between"
              @keyFilter={{NUMERICAL_BETWEEN_FILTER}}
            />
          </SF.Item>
        </ShwFlex>
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

    <ShwCarbonizationComparisonGrid @label="ClearButton">
      <:theming>
        <HdsFilterBarFilterGroupClearButton @text="Clear filter" />
      </:theming>
      <:reference as |R|>
        <R.NoEquivalent @isCompact={{true}} />
      </:reference>
    </ShwCarbonizationComparisonGrid>

  </section>
</template>;

export default FilterBarCarbonizationIndex;
