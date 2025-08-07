/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import { HdsAdvancedTableThSort } from '@hashicorp/design-system-components/components';

import ShwFlex from 'showcase/components/shw/flex';
import { INTERACTION_STATES } from 'showcase/utils/component-states';

export interface AdvancedTableThSortMatrixSignature {
  Element: HTMLDivElement;
}

const AdvancedTableThSortMatrix: TemplateOnlyComponent<AdvancedTableThSortMatrixSignature> =
  <template>
    <ShwFlex
      @direction="column"
      @label="Interactive states + Sorting order"
      as |SF|
    >
      {{#each INTERACTION_STATES as |state|}}
        <SF.Item @grow={{true}}>
          <div
            class="hds-advanced-table"
            role="grid"
            {{style gridTemplateColumns="repeat(3, 1fr)"}}
          >
            <div class="hds-advanced-table__thead" role="rowgroup">
              <div class="hds-advanced-table__tr" role="row">
                <HdsAdvancedTableThSort
                  mock-state-value={{state}}
                  mock-state-selector="button"
                  @tooltip="Here is more information"
                >
                  Unsorted ({{state}})
                </HdsAdvancedTableThSort>
                <HdsAdvancedTableThSort
                  @sortOrder="asc"
                  mock-state-value={{state}}
                  mock-state-selector="button"
                >
                  Ascending
                </HdsAdvancedTableThSort>
                <HdsAdvancedTableThSort
                  @sortOrder="desc"
                  mock-state-value={{state}}
                  mock-state-selector="button"
                >
                  Descending
                </HdsAdvancedTableThSort>
              </div>
            </div>
          </div>
        </SF.Item>
      {{/each}}
    </ShwFlex>

    <ShwFlex @label="Alignment" as |SF|>
      <SF.Item @grow={{true}}>
        <div
          class="hds-advanced-table"
          role="grid"
          {{style gridTemplateColumns="repeat(6, 1fr)"}}
        >
          <div class="hds-advanced-table__thead" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableThSort>Left</HdsAdvancedTableThSort>
              <HdsAdvancedTableThSort
                @tooltip="Here is more information"
              >Left</HdsAdvancedTableThSort>
              <HdsAdvancedTableThSort
                @align="center"
              >Center</HdsAdvancedTableThSort>
              <HdsAdvancedTableThSort
                @align="center"
                @tooltip="Here is more information"
              >Center</HdsAdvancedTableThSort>
              <HdsAdvancedTableThSort
                @align="right"
              >Right</HdsAdvancedTableThSort>
              <HdsAdvancedTableThSort
                @align="right"
                @tooltip="Here is more information"
              >Right</HdsAdvancedTableThSort>
            </div>
          </div>
        </div>
      </SF.Item>
    </ShwFlex>

    <ShwFlex @direction="column" @label="Multi-line" as |SF|>
      <SF.Item {{style width="600px"}}>
        <div
          class="hds-advanced-table"
          role="grid"
          {{style gridTemplateColumns="repeat(2, 1fr)"}}
        >
          <div class="hds-advanced-table__thead" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableThSort>
                This is a very long text that should go on two lines
              </HdsAdvancedTableThSort>
              <HdsAdvancedTableThSort @tooltip="Here is more information">
                This is a very long text that should go on two lines
              </HdsAdvancedTableThSort>
            </div>
          </div>
        </div>
      </SF.Item>
    </ShwFlex>
  </template>;

export default AdvancedTableThSortMatrix;
