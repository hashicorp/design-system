/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import { capitalize } from '@ember/string';

import { HdsAdvancedTableTh } from '@hashicorp/design-system-components/components';

import ShwFlex from 'showcase/components/shw/flex';
import { INTERACTION_STATES } from 'showcase/utils/component-states';

export interface AdvancedTableThMatrixSignature {
  Element: HTMLDivElement;
}

const AdvancedTableThMatrix: TemplateOnlyComponent<AdvancedTableThMatrixSignature> =
  <template>
    <ShwFlex @label="Interactive states" as |SF|>
      <SF.Item @grow={{true}}>
        <div
          class="hds-advanced-table"
          role="grid"
          {{style gridTemplateColumns="repeat(4, 1fr)"}}
        >
          <div class="hds-advanced-table__thead" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              {{#each INTERACTION_STATES as |state|}}
                <HdsAdvancedTableTh
                  @tooltip="Here is more information"
                  mock-state-value={{state}}
                  mock-state-selector="button"
                >
                  {{capitalize state}}
                </HdsAdvancedTableTh>
              {{/each}}
            </div>
          </div>
        </div>
      </SF.Item>
    </ShwFlex>

    <ShwFlex @label="Expandable" as |SF|>
      <SF.Item @grow={{true}}>
        <div
          class="hds-advanced-table"
          role="grid"
          {{style gridTemplateColumns="repeat(4, 1fr)"}}
        >
          <div class="hds-advanced-table__thead" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              {{#each INTERACTION_STATES as |state|}}
                <HdsAdvancedTableTh
                  mock-state-value={{state}}
                  mock-state-selector="button"
                  @isExpandable={{true}}
                  @hasExpandAllButton={{true}}
                >
                  {{capitalize state}}
                </HdsAdvancedTableTh>
              {{/each}}
            </div>
          </div>
        </div>
      </SF.Item>
      <SF.Item @grow={{true}}>
        <div
          class="hds-advanced-table"
          role="grid"
          {{style gridTemplateColumns="repeat(4, 1fr)"}}
        >
          <div class="hds-advanced-table__thead" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              {{#each INTERACTION_STATES as |state|}}
                <HdsAdvancedTableTh
                  mock-state-value={{state}}
                  mock-state-selector="button"
                  @isExpandable={{true}}
                  @isExpanded={{true}}
                  @hasExpandAllButton={{true}}
                >
                  {{capitalize state}}
                </HdsAdvancedTableTh>
              {{/each}}
            </div>
          </div>
        </div>
      </SF.Item>
    </ShwFlex>

    <ShwFlex @label="Expandable with tooltip" as |SF|>
      <SF.Item @grow={{true}}>
        <div
          class="hds-advanced-table"
          role="grid"
          {{style gridTemplateColumns="repeat(4, 1fr)"}}
        >
          <div class="hds-advanced-table__thead" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              {{#each INTERACTION_STATES as |state|}}
                <HdsAdvancedTableTh
                  @tooltip="Here is more information"
                  mock-state-value={{state}}
                  mock-state-selector="button"
                  @isExpandable={{true}}
                  @hasExpandAllButton={{true}}
                >
                  {{capitalize state}}
                </HdsAdvancedTableTh>
              {{/each}}
            </div>
          </div>
        </div>
      </SF.Item>
      <SF.Item @grow={{true}}>
        <div
          class="hds-advanced-table"
          role="grid"
          {{style gridTemplateColumns="repeat(4, 1fr)"}}
        >
          <div class="hds-advanced-table__thead" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              {{#each INTERACTION_STATES as |state|}}
                <HdsAdvancedTableTh
                  @tooltip="Here is more information"
                  mock-state-value={{state}}
                  mock-state-selector="button"
                  @isExpandable={{true}}
                  @isExpanded={{true}}
                  @hasExpandAllButton={{true}}
                >
                  {{capitalize state}}
                </HdsAdvancedTableTh>
              {{/each}}
            </div>
          </div>
        </div>
      </SF.Item>
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
              <HdsAdvancedTableTh>Left</HdsAdvancedTableTh>
              <HdsAdvancedTableTh
                @tooltip="Here is more information"
              >Left</HdsAdvancedTableTh>
              <HdsAdvancedTableTh @align="center">Center</HdsAdvancedTableTh>
              <HdsAdvancedTableTh
                @align="center"
                @tooltip="Here is more information"
              >Center</HdsAdvancedTableTh>
              <HdsAdvancedTableTh @align="right">Right</HdsAdvancedTableTh>
              <HdsAdvancedTableTh
                @align="right"
                @tooltip="Here is more information"
              >Right</HdsAdvancedTableTh>
            </div>
          </div>
        </div>
      </SF.Item>
    </ShwFlex>

    <ShwFlex @label="Display" as |SF|>
      <SF.Item @label="Th with visually hidden text" @grow={{true}}>
        <div
          class="hds-advanced-table"
          role="grid"
          {{style gridTemplateColumns="repeat(4, 1fr)"}}
        >
          <div class="hds-advanced-table__thead" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Lorem</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Ipsum</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Dolor</HdsAdvancedTableTh>
              <HdsAdvancedTableTh @isVisuallyHidden={{true}}>Sit amet</HdsAdvancedTableTh>
            </div>
          </div>
        </div>
      </SF.Item>
    </ShwFlex>

    <ShwFlex @label="Sticky header" as |SF|>
      <SF.Item @label="Default" @grow={{true}}>
        <div
          class="hds-advanced-table"
          role="grid"
          {{style gridTemplateColumns="repeat(4, 1fr)"}}
        >
          <div
            class="hds-advanced-table__thead hds-advanced-table__thead--sticky"
            role="rowgroup"
          >
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Lorem</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Ipsum</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Dolor</HdsAdvancedTableTh>
              <HdsAdvancedTableTh @isVisuallyHidden={{true}}>Sit amet</HdsAdvancedTableTh>
            </div>
          </div>
        </div>
      </SF.Item>
      <SF.Item @label="Pinned" @grow={{true}}>
        <div
          class="hds-advanced-table"
          role="grid"
          {{style gridTemplateColumns="repeat(4, 1fr)"}}
        >
          <div
            class="hds-advanced-table__thead hds-advanced-table__thead--sticky hds-advanced-table__thead--is-pinned"
            role="rowgroup"
          >
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Lorem</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Ipsum</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Dolor</HdsAdvancedTableTh>
              <HdsAdvancedTableTh @isVisuallyHidden={{true}}>Sit amet</HdsAdvancedTableTh>
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
          <div
            class="hds-advanced-table__thead hds-advanced-table__thead"
            role="rowgroup"
          >
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>
                This is a very long text that should go on two lines
              </HdsAdvancedTableTh>
              <HdsAdvancedTableTh @tooltip="Here is more information">
                This is a very long text that should go on two lines
              </HdsAdvancedTableTh>
            </div>
          </div>
        </div>
      </SF.Item>
    </ShwFlex>
  </template>;

export default AdvancedTableThMatrix;
