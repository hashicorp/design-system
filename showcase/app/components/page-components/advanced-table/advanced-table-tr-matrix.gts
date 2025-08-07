/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import { array } from '@ember/helper';

import {
  HdsAdvancedTableTr,
  HdsAdvancedTableTh,
  HdsAdvancedTableTd,
} from '@hashicorp/design-system-components/components';

import ShwFlex from 'showcase/components/shw/flex';

export interface AdvancedTableTrSortMatrixSignature {
  Element: HTMLDivElement;
}

const AdvancedTableTrSortMatrix: TemplateOnlyComponent<AdvancedTableTrSortMatrixSignature> =
  <template>
    {{#let (array false true) as |hasMultiline|}}
      {{#each hasMultiline as |isMultiline|}}
        <ShwFlex
          @direction="column"
          @label="Nested rows {{if isMultiline 'with multiline'}}"
          as |SF|
        >
          <SF.Item @grow={{true}}>
            <div
              class="hds-advanced-table hds-advanced-table--density-medium"
              {{style gridTemplateColumns="repeat(4, 1fr)"}}
              role="grid"
            >
              <div class="hds-advanced-table__tbody" role="rowgroup">
                {{#let (array 0 1 2) as |depths|}}
                  {{#each depths as |depth|}}
                    <HdsAdvancedTableTr @depth={{depth}}>
                      <HdsAdvancedTableTh
                        @depth={{depth}}
                        @isExpandable={{true}}
                      >
                        Depth
                        {{depth}}
                        {{#if isMultiline}}
                          - This is a very long text that should go on two lines
                        {{/if}}
                      </HdsAdvancedTableTh>
                      <HdsAdvancedTableTd>
                        Lorem
                      </HdsAdvancedTableTd>
                      <HdsAdvancedTableTd>
                        Ipsum
                      </HdsAdvancedTableTd>
                      <HdsAdvancedTableTd>
                        Dolor
                      </HdsAdvancedTableTd>
                    </HdsAdvancedTableTr>
                  {{/each}}
                {{/let}}
              </div>
            </div>
          </SF.Item>
        </ShwFlex>
      {{/each}}
    {{/let}}
  </template>;

export default AdvancedTableTrSortMatrix;
