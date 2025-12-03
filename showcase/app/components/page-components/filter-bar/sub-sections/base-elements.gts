/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array, get } from '@ember/helper';
import { eq } from 'ember-truth-helpers';

import ShwDivider from 'showcase/components/shw/divider';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import NOOP from 'showcase/utils/noop';

import {
  HdsFilterBarDropdown,
  HdsFilterBarTabs,
  HdsFilterBarTabsTab,
  HdsFilterBarTabsPanel,
  HdsFilterBarFilterGroup,
  HdsFilterBarFilterGroupCheckbox,
  HdsFilterBarFilterGroupDate,
  HdsFilterBarFilterGroupGeneric,
  HdsFilterBarFilterGroupNumerical,
  HdsFilterBarFilterGroupRadio,
  type HdsFilterBarNumericalFilter,
  type HdsFilterBarDateFilter,
  type HdsFilterBarSingleSelectFilter,
  type HdsFilterBarMultiSelectFilter,
  type HdsFilterBarSearchFilter,
  type HdsFilterBarFilter,
  type HdsFilterBarFilters,
  type HdsFilterBarGenericFilter,
} from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus'];

const EMPTY_FILTERS = {} as HdsFilterBarFilters;

const DATE_FILTER_GROUP_TYPES = ['date', 'time', 'datetime'];

const DATE_FILTERS = {
  date: {
    type: 'date',
    data: {
      selector: 'before',
      value: '2025-01-01',
    }
  },
  datetime: {
    type: 'datetime',
    data: {
      selector: 'before',
      value: '2025-01-01T12:00',
    }
  },
  time: {
    type: 'time',
    data: {
      selector: 'before',
      value: '12:00'
    }
  }
}

const DATE_BETWEEN_FILTERS = {
  date: {
    type: 'date',
    data: {
      selector: 'between',

    },
  },
  datetime: {
    type: 'datetime',
    data: {
      selector: 'between',
    },
  },
  time: {
    type: 'time',
    data: {
      selector: 'between',
    },
  },
}

const NUMERICAL_FILTER = {
  type: 'numerical',
  data: {
    selector: 'less-than',
    value: 100,
  },
};

const NUMERICAL_BETWEEN_FILTER = {
  type: 'numerical',
  data: {
    selector: 'between',
  },
};

const SubSectionBaseElements: TemplateOnlyComponent = <template>
  <ShwTextH2>Base elements</ShwTextH2>

  <ShwTextH3>Dropdown</ShwTextH3>

  <ShwGrid @columns={{2}} as |SG|>
    <SG.Item @label="Base (default)">
      <HdsFilterBarDropdown @filters={{EMPTY_FILTERS}} />
    </SG.Item>
    <SG.Item @label="With live filtering">
      <HdsFilterBarDropdown @filters={{EMPTY_FILTERS}} @isLiveFilter={{true}} />
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Tabs</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item as |SFI|>
      <SFI.Label>Base (default)</SFI.Label>
      <HdsFilterBarTabs @ariaLabel="Filter bar tabs" as |T|>
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
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With pre-selected tab</SFI.Label>
      <HdsFilterBarTabs @ariaLabel="Filter bar tabs" @selectedTabIndex={{1}} as |T|>
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
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>TabsTab</ShwTextH4>

  <ShwTextBody>Content</ShwTextBody>

  {{#each (array "Unselected" "Selected") as |selection|}}
    <ShwGrid @columns={{2}} @label={{selection}} as |SG|>
      <SG.Item @label="Base (default)">
        <HdsFilterBarTabsTab class={{if (eq selection "Selected") "hds-filter-bar__tabs__tab--is-selected"}}>Tab 1</HdsFilterBarTabsTab>
      </SG.Item>
      <SG.Item @label="With filter count">
        <HdsFilterBarTabsTab @numFilters={{1}} class={{if (eq selection "Selected") "hds-filter-bar__tabs__tab--is-selected"}}>Tab 1</HdsFilterBarTabsTab>
      </SG.Item>
    </ShwGrid>
  {{/each}}

  <ShwTextBody>States</ShwTextBody>

  {{#each (array "Unselected" "Selected") as |selection|}}
    <ShwGrid @columns={{4}} @label={{selection}} as |SG|>
      {{#each STATES as |state|}}
        <SG.Item @label={{state}}>
          <HdsFilterBarTabsTab @numFilters={{1}} class={{if (eq selection "Selected") "hds-filter-bar__tabs__tab--is-selected"}} mock-state-value={{state}} mock-state-selector="button">Tab 1</HdsFilterBarTabsTab>
        </SG.Item>
      {{/each}}
    </ShwGrid>
  {{/each}}

  <ShwTextH4>TabsPanel</ShwTextH4>

  <HdsFilterBarTabsPanel>
    <ShwPlaceholder @text="Panel with generic content" @height="50" />
  </HdsFilterBarTabsPanel>

  <ShwDivider @level={{2}} />

  <ShwTextH3>FilterGroup</ShwTextH3>

  <ShwTextH4>Type</ShwTextH4>

  <ShwTextBody>Single-select</ShwTextBody>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item as |SFI|>
      <SFI.Label>Default</SFI.Label>
      <HdsFilterBarTabs @ariaLabel="Filter bar tabs" as |T|>
        <HdsFilterBarFilterGroup
          @key="name"
          @text="Name"
          @type="single-select"
          @tab={{T.Tab}}
          @panel={{T.Panel}}
          @filters={{EMPTY_FILTERS}}
          @onChange={{NOOP}}
          as |F|
        >
          <F.Radio @value="1" @label="Option 1" />
          <F.Radio @value="2" @label="Option 2" />
          <F.Radio @value="3" @label="Option 3" />
        </HdsFilterBarFilterGroup>
      </HdsFilterBarTabs>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With search</SFI.Label>
      <HdsFilterBarTabs @ariaLabel="Filter bar tabs" as |T|>
        <HdsFilterBarFilterGroup
          @key="name"
          @text="Name"
          @type="single-select"
          @searchEnabled={{true}}
          @tab={{T.Tab}}
          @panel={{T.Panel}}
          @filters={{EMPTY_FILTERS}}
          @onChange={{NOOP}}
          as |F|
        >
          <F.Radio @value="1" @label="Option 1" />
          <F.Radio @value="2" @label="Option 2" />
          <F.Radio @value="3" @label="Option 3" />
        </HdsFilterBarFilterGroup>
      </HdsFilterBarTabs>
    </SF.Item>
  </ShwFlex>

  <ShwTextBody>Multi-select</ShwTextBody>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item as |SFI|>
      <SFI.Label>Default</SFI.Label>
      <HdsFilterBarTabs @ariaLabel="Filter bar tabs" as |T|>
        <HdsFilterBarFilterGroup
          @key="name"
          @text="Name"
          @type="multi-select"
          @tab={{T.Tab}}
          @panel={{T.Panel}}
          @filters={{EMPTY_FILTERS}}
          @onChange={{NOOP}}
          as |F|
        >
          <F.Checkbox @value="1" @label="Option 1" />
          <F.Checkbox @value="2" @label="Option 2" />
          <F.Checkbox @value="3" @label="Option 3" />
        </HdsFilterBarFilterGroup>
      </HdsFilterBarTabs>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With search</SFI.Label>
      <HdsFilterBarTabs @ariaLabel="Filter bar tabs" as |T|>
        <HdsFilterBarFilterGroup
          @key="name"
          @text="Name"
          @type="multi-select"
          @searchEnabled={{true}}
          @tab={{T.Tab}}
          @panel={{T.Panel}}
          @filters={{EMPTY_FILTERS}}
          @onChange={{NOOP}}
          as |F|
        >
          <F.Checkbox @value="1" @label="Option 1" />
          <F.Checkbox @value="2" @label="Option 2" />
          <F.Checkbox @value="3" @label="Option 3" />
        </HdsFilterBarFilterGroup>
      </HdsFilterBarTabs>
    </SF.Item>
  </ShwFlex>

  <ShwTextBody>Numerical</ShwTextBody>

  <HdsFilterBarTabs @ariaLabel="Filter bar tabs" as |T|>
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

  <ShwTextBody>Date</ShwTextBody>

  <HdsFilterBarTabs @ariaLabel="Filter bar tabs" as |T|>
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

  <ShwTextBody>Time</ShwTextBody>

  <HdsFilterBarTabs @ariaLabel="Filter bar tabs" as |T|>
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

  <ShwTextBody>Datetime</ShwTextBody>

  <HdsFilterBarTabs @ariaLabel="Filter bar tabs" as |T|>
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

  <ShwTextH4>Base elements</ShwTextH4>

  <ShwGrid @columns={{4}} as |SG|>
    <SG.Item @label="Generic">
      <HdsFilterBarFilterGroupGeneric>
        <ShwPlaceholder @text="Generic content" @height="50" />
      </HdsFilterBarFilterGroupGeneric>
    </SG.Item>
    <SG.Item @label="Checkbox">
      <HdsFilterBarFilterGroupCheckbox @label="Label" @value="value" @keyFilter={{undefined}} />
    </SG.Item>
    <SG.Item @label="Radio">
      <HdsFilterBarFilterGroupRadio @label="Label" @value="value" @keyFilter={{undefined}} />
    </SG.Item>
  </ShwGrid>

  {{#each DATE_FILTER_GROUP_TYPES as |type|}}
    <ShwGrid @columns={{3}} @label="Date, type: {{type}}" as |SG|>
      <SG.Item @label="Base (default)">
        <HdsFilterBarFilterGroupDate @type={{type}} />
      </SG.Item>
      <SG.Item @label="Selector + value">
        <HdsFilterBarFilterGroupDate @type={{type}} @keyFilter={{get DATE_FILTERS type}} />
      </SG.Item>
      <SG.Item @label="Selector: between">
        <HdsFilterBarFilterGroupDate @type={{type}} @keyFilter={{get DATE_BETWEEN_FILTERS type}} />
      </SG.Item>
    </ShwGrid>
  {{/each}}

  <ShwGrid @columns={{3}} @label="Numerical" as |SG|>
    <SG.Item @label="Base (default)">
      <HdsFilterBarFilterGroupNumerical @keyFilter={{undefined}} />
    </SG.Item>
    <SG.Item @label="Selector + value">
      <HdsFilterBarFilterGroupNumerical @keyFilter={{NUMERICAL_FILTER}} />
    </SG.Item>
    <SG.Item @label="Selector: between">
      <HdsFilterBarFilterGroupNumerical @keyFilter={{NUMERICAL_BETWEEN_FILTER}} />
    </SG.Item>
  </ShwGrid>
</template>

export default SubSectionBaseElements;
