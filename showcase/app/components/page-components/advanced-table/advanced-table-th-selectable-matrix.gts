/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import { array } from '@ember/helper';

import {
  HdsAdvancedTableThSelectable,
  HdsAdvancedTableTh,
  HdsAdvancedTableTd,
} from '@hashicorp/design-system-components/components';

import ShwFlex from 'showcase/components/shw/flex';
import NOOP from 'showcase/utils/noop';

const MOCK_INDETERMINATE_STATE = (checkbox: HTMLInputElement) => {
  checkbox.indeterminate = true;
};

export interface AdvancedTableThSelectableMatrixSignature {
  Element: HTMLDivElement;
}

const AdvancedTableThSelectableMatrix: TemplateOnlyComponent<AdvancedTableThSelectableMatrixSignature> =
  <template>
    <ShwFlex @direction="row" @gap="2rem" as |SF|>
      {{#let (array false true) as |booleans|}}
        {{#each booleans as |bool1|}}
          {{#each booleans as |bool2|}}
            <SF.Item
              @label="{{if bool1 'Selected' 'Deselected'}} {{if
                bool2
                ' with sort'
              }}"
            >

              <div
                class="hds-advanced-table hds-advanced-table--density-medium"
                role="grid"
                {{style gridTemplateColumns="auto 1fr"}}
              >
                <div class="hds-advanced-table__thead" role="rowgroup">
                  <div class="hds-advanced-table__tr" role="row">
                    <HdsAdvancedTableThSelectable
                      @selectionScope="col"
                      @isSelected={{bool1}}
                      @onClickSortBySelected={{if bool2 NOOP}}
                    />
                    <HdsAdvancedTableTh>Lorem</HdsAdvancedTableTh>
                  </div>
                </div>
                <div class="hds-advanced-table__tbody" role="rowgroup">
                  <div class="hds-advanced-table__tr" role="row">
                    <HdsAdvancedTableThSelectable
                      @selectionScope="row"
                      @isSelected={{bool1}}
                    />
                    <HdsAdvancedTableTd>Ipsum</HdsAdvancedTableTd>
                  </div>
                </div>
              </div>
              <br />

              <div
                class="hds-advanced-table hds-advanced-table--density-medium"
                role="grid"
                {{style gridTemplateColumns="auto 1fr"}}
              >
                <div class="hds-advanced-table__thead" role="rowgroup">
                  <div class="hds-advanced-table__tr" role="row">
                    <HdsAdvancedTableThSelectable
                      @selectionScope="col"
                      @isSelected={{bool1}}
                      @onClickSortBySelected={{if bool2 NOOP}}
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
                      @isSelected={{bool1}}
                      mock-state-value="focus"
                      mock-state-selector="input"
                    />
                    <HdsAdvancedTableTd>Ipsum</HdsAdvancedTableTd>
                  </div>
                </div>
              </div>
            </SF.Item>
          {{/each}}
        {{/each}}
      {{/let}}
      {{#let (array false true) as |booleans|}}
        {{#each booleans as |bool|}}
          <SF.Item @label="Indeterminate {{if bool ' with sort'}}">
            <div
              class="hds-advanced-table hds-advanced-table--density-medium"
              role="grid"
              {{style gridTemplateColumns="auto 1fr"}}
            >
              <div class="hds-advanced-table__thead" role="rowgroup">
                <div class="hds-advanced-table__tr" role="row">
                  <HdsAdvancedTableThSelectable
                    @selectionScope="col"
                    @isSelected={{true}}
                    @onClickSortBySelected={{if bool NOOP}}
                    @didInsert={{MOCK_INDETERMINATE_STATE}}
                  />
                  <HdsAdvancedTableTh>Lorem</HdsAdvancedTableTh>
                </div>
              </div>
              <div class="hds-advanced-table__tbody" role="rowgroup">
                <div class="hds-advanced-table__tr" role="row">
                  <HdsAdvancedTableThSelectable
                    @selectionScope="row"
                    @isSelected={{false}}
                    @didInsert={{MOCK_INDETERMINATE_STATE}}
                  />
                  <HdsAdvancedTableTd>Ipsum</HdsAdvancedTableTd>
                </div>
              </div>
            </div>
            <br />

            <div
              class="hds-advanced-table hds-advanced-table--density-medium"
              role="grid"
              {{style gridTemplateColumns="auto 1fr"}}
            >
              <div class="hds-advanced-table__thead" role="rowgroup">
                <div class="hds-advanced-table__tr" role="row">
                  <HdsAdvancedTableThSelectable
                    @selectionScope="col"
                    @isSelected={{true}}
                    @didInsert={{MOCK_INDETERMINATE_STATE}}
                    @onClickSortBySelected={{if bool NOOP}}
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
                    @isSelected={{false}}
                    @didInsert={{MOCK_INDETERMINATE_STATE}}
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
  </template>;

export default AdvancedTableThSelectableMatrix;
