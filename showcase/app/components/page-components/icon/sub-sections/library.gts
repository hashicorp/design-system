/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@ember/modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwGrid from 'showcase/components/shw/grid';
import ShwLabel from 'showcase/components/shw/label';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsIcon } from '@hashicorp/design-system-components/components';
import catalog from '@hashicorp/flight-icons/catalog.json';

import type { IconName } from '@hashicorp/flight-icons/svg';

export default class SubSectionIconLibrary extends Component {
  @tracked filterBy = '';

  setLibraryFilter = (event: Event) => {
    const { value } = event.target as HTMLSelectElement;
    this.filterBy = value;
  };

  get filterByClass() {
    return this.filterBy !== ''
      ? `shw-component-icon-library-filter-${this.filterBy}`
      : '';
  }

  get groupedIcons() {
    const groupedIcons: Record<string, IconName[]> = {}; // icons grouped by category

    catalog.assets
      .filter(({ size }) => size === '24')
      .forEach((icon) => {
        const category = icon.category;
        if (!groupedIcons[category]) {
          groupedIcons[category] = [];
        }
        groupedIcons[category].push(icon.iconName as IconName);
      });

    // Sort the categories alphabetically
    const sortedGroupedIcons: Record<string, IconName[]> = {};
    Object.keys(groupedIcons)
      .sort()
      .forEach((category) => {
        sortedGroupedIcons[category] = groupedIcons[category] as IconName[];
      });

    return sortedGroupedIcons;
  }

  <template>
    <div class="shw-component-icon-library-header">
      <ShwTextH2>Library</ShwTextH2>
      <div class="shw-component-icon-library-filter">
        <label
          for="shw-component-icon-library-filter-control"
          class="shw-component-icon-library-filter-label"
        >Filter:</label>
        <select
          id="shw-component-icon-library-filter-control"
          class="shw-component-icon-library-filter-control"
          {{on "change" this.setLibraryFilter}}
        >
          <option value="">Show all</option>
          <option value="carbonized">With mapping</option>
          <option value="non-carbonized">Without mapping</option>
        </select>
      </div>
    </div>

    {{#each-in this.groupedIcons as |categoryName categoryIcons|}}
      <ShwTextH4 @tag="h3">{{categoryName}}</ShwTextH4>

      <ShwGrid @columns={{8}} @gap="1rem" class={{this.filterByClass}} as |SG|>
        {{#each categoryIcons as |iconName|}}
          <SG.Item class="shw-component-icon-library-item">
            <HdsIcon @name={{iconName}} @size="24" />
            <ShwLabel
              class="hds-typography-body-100 shw-icon-label"
            >{{iconName}}</ShwLabel>
          </SG.Item>
        {{/each}}
      </ShwGrid>

      <ShwDivider @level={{2}} />

    {{/each-in}}
  </template>
}
