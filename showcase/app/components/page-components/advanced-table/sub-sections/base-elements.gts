/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import style from 'ember-style-modifier/modifiers/style';
import { array, get } from '@ember/helper';
import { capitalize } from '@ember/string';
import type Owner from '@ember/owner';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import NOOP from 'showcase/utils/noop';

import {
  HdsAdvancedTableTd,
  HdsAdvancedTableTh,
  HdsAdvancedTableThButtonTooltip,
  HdsAdvancedTableThSort,
  HdsAdvancedTableTr,
  HdsBadge,
  HdsButton,
  HdsDropdown,
  HdsDropdownToggleIcon,
  HdsIcon,
  HdsLayoutFlex,
  HdsTooltipButton,
} from '@hashicorp/design-system-components/components';
import HdsAdvancedTableModel from '@hashicorp/design-system-components/components/hds/advanced-table/models/table';
import HdsAdvancedTableThButtonExpand from '@hashicorp/design-system-components/components/hds/advanced-table/th-button-expand';
import HdsAdvancedTableThButtonSort from '@hashicorp/design-system-components/components/hds/advanced-table/th-button-sort';
import HdsAdvancedTableThReorderHandle from '@hashicorp/design-system-components/components/hds/advanced-table/th-reorder-handle';
import HdsAdvancedTableThResizeHandle from '@hashicorp/design-system-components/components/hds/advanced-table/th-resize-handle';
import HdsAdvancedTableThSelectable from '@hashicorp/design-system-components/components/hds/advanced-table/th-selectable';

const STATES = ['default', 'hover', 'active', 'focus'];

export default class SubSectionsBaseElements extends Component {
  sampleTableModel!: HdsAdvancedTableModel;

  constructor(owner: Owner, args: Record<string, never>) {
    super(owner, args);

    this.sampleTableModel = new HdsAdvancedTableModel({
      model: [
        {
          value: 'lorem',
          status: 'active',
        },
        {
          value: 'ipsum',
          status: 'active',
        },
      ],
      hasResizableColumns: true,
      columns: [
        {
          label: 'Label',
          isVisuallyHidden: true,
          width: '200px',
        },
        {
          label: 'Status',
          width: '200px',
        },
      ],
    });
  }

  mockIndeterminateState = (checkbox: HTMLInputElement) => {
    checkbox.indeterminate = true;
  };

  <template>
    <ShwTextH2>Base elements</ShwTextH2>

    <ShwTextH3>Tr</ShwTextH3>

    <ShwTextBody>These examples are for display only, clicking the expand button
      will not toggle the rows.</ShwTextBody>

    <ShwFlex @direction="column" @label="Nested rows" as |SF|>
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
                  <HdsAdvancedTableTh @depth={{depth}} @isExpandable={{true}}>
                    Depth
                    {{depth}}
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

    <ShwFlex @direction="column" @label="Nested rows with multiline" as |SF|>
      <SF.Item @grow={{true}}>
        <div
          class="hds-advanced-table hds-advanced-table--density-medium"
          role="grid"
          {{style gridTemplateColumns="repeat(4, 1fr)"}}
        >
          <div class="hds-advanced-table__tbody" role="rowgroup">
            {{#let (array 0 1 2) as |depths|}}
              {{#each depths as |depth|}}
                <HdsAdvancedTableTr @depth={{depth}}>
                  <HdsAdvancedTableTh @depth={{depth}} @isExpandable={{true}}>
                    Depth
                    {{depth}}
                    - This is a very long text that should go on two lines
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

    <ShwTextH3>ThSort</ShwTextH3>

    <ShwFlex
      @direction="column"
      @label="Interactive states + Sorting order"
      as |SF|
    >
      {{#each STATES as |state|}}
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
          class="hds-advanced-table hds-advanced-table--density-medium"
          role="grid"
          {{style gridTemplateColumns="repeat(3, 1fr)"}}
        >
          <div class="hds-advanced-table__thead" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableThSort>Left</HdsAdvancedTableThSort>
              <HdsAdvancedTableThSort
                @align="center"
              >Center</HdsAdvancedTableThSort>
              <HdsAdvancedTableThSort
                @align="right"
              >Right</HdsAdvancedTableThSort>
            </div>
          </div>
        </div>
      </SF.Item>
    </ShwFlex>

    <ShwFlex @label="Alignment with all interactive elements" as |SF|>
      <SF.Item @grow={{true}}>
        <div
          class="hds-advanced-table hds-advanced-table--density-medium"
          role="grid"
          {{style gridTemplateColumns="repeat(4, 1fr)"}}
        >
          <div
            class="hds-advanced-table__thead hds-advanced-table__thead--has-resizable-columns"
            role="rowgroup"
          >
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableThSort
                @tooltip="Here is more information"
                @column={{get this.sampleTableModel.columns 1}}
                @hasResizableColumns={{true}}
              >Left</HdsAdvancedTableThSort>
              <HdsAdvancedTableThSort
                @align="center"
                @tooltip="Here is more information"
                @column={{get this.sampleTableModel.columns 1}}
                @hasResizableColumns={{true}}
              >Center</HdsAdvancedTableThSort>
              <HdsAdvancedTableThSort
                @align="right"
                @tooltip="Here is more information"
                @column={{get this.sampleTableModel.columns 1}}
                @hasResizableColumns={{true}}
              >Right</HdsAdvancedTableThSort>
              {{! Note: need a last column to avoid a scrollbar}}
              <HdsAdvancedTableThSort>Last column</HdsAdvancedTableThSort>
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

    <ShwDivider @level={{2}} />

    <ShwTextH3>Th</ShwTextH3>

    <ShwFlex @label="Interactive states" as |SF|>
      <SF.Item @grow={{true}}>
        <div
          class="hds-advanced-table"
          role="grid"
          {{style gridTemplateColumns="repeat(4, 1fr)"}}
        >
          <div class="hds-advanced-table__thead" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              {{#each STATES as |state|}}
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
              {{#each STATES as |state|}}
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
              {{#each STATES as |state|}}
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
              {{#each STATES as |state|}}
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
              {{#each STATES as |state|}}
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
          class="hds-advanced-table hds-advanced-table--density-medium"
          role="grid"
          {{style gridTemplateColumns="repeat(3, 1fr)"}}
        >
          <div class="hds-advanced-table__thead" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Left</HdsAdvancedTableTh>
              <HdsAdvancedTableTh @align="center">Center</HdsAdvancedTableTh>
              <HdsAdvancedTableTh @align="right">Right</HdsAdvancedTableTh>
            </div>
          </div>
          <div class="hds-advanced-table__tbody" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Left</HdsAdvancedTableTh>
              <HdsAdvancedTableTh @align="center">Center</HdsAdvancedTableTh>
              <HdsAdvancedTableTh @align="right">Right</HdsAdvancedTableTh>
            </div>
          </div>
        </div>
      </SF.Item>
    </ShwFlex>

    <ShwFlex @label="Alignment with all interactive elements" as |SF|>
      <SF.Item @grow={{true}}>
        <div
          class="hds-advanced-table hds-advanced-table--density-medium"
          role="grid"
          {{style gridTemplateColumns="repeat(4, 1fr)"}}
        >
          <div
            class="hds-advanced-table__thead hds-advanced-table__thead--has-resizable-columns"
            role="rowgroup"
          >
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh
                @isExpandable={{true}}
                @tooltip="Here is more information"
                @column={{get this.sampleTableModel.columns 1}}
                @hasResizableColumns={{true}}
              >Left</HdsAdvancedTableTh>
              <HdsAdvancedTableTh
                @align="center"
                @isExpandable={{true}}
                @tooltip="Here is more information"
                @column={{get this.sampleTableModel.columns 1}}
                @hasResizableColumns={{true}}
              >Center</HdsAdvancedTableTh>
              <HdsAdvancedTableTh
                @align="right"
                @isExpandable={{true}}
                @tooltip="Here is more information"
                @column={{get this.sampleTableModel.columns 1}}
                @hasResizableColumns={{true}}
              >Right</HdsAdvancedTableTh>
              {{! Note: need a last column to avoid a scrollbar}}
              <HdsAdvancedTableTh>Last column</HdsAdvancedTableTh>
            </div>
          </div>
          <div class="hds-advanced-table__tbody" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh
                @isExpandable={{true}}
                @tooltip="Here is more information"
              >Left</HdsAdvancedTableTh>
              <HdsAdvancedTableTh
                @align="center"
                @isExpandable={{true}}
                @tooltip="Here is more information"
              >Center</HdsAdvancedTableTh>
              <HdsAdvancedTableTh
                @align="right"
                @isExpandable={{true}}
                @tooltip="Here is more information"
              >Right</HdsAdvancedTableTh>
              {{! Note: need a last column to avoid a scrollbar}}
              <HdsAdvancedTableTh>Last column</HdsAdvancedTableTh>
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
              <HdsAdvancedTableTh
                @column={{get this.sampleTableModel.columns 0}}
              >Sit amet</HdsAdvancedTableTh>
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
              <HdsAdvancedTableTh
                @column={{get this.sampleTableModel.columns 0}}
              >Sit amet</HdsAdvancedTableTh>
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
              <HdsAdvancedTableTh
                @column={{get this.sampleTableModel.columns 0}}
              >Sit amet</HdsAdvancedTableTh>
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

    <ShwDivider @level={{2}} />

    <ShwTextH3>ThSelectable</ShwTextH3>

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
                    @didInsert={{this.mockIndeterminateState}}
                  />
                  <HdsAdvancedTableTh>Lorem</HdsAdvancedTableTh>
                </div>
              </div>
              <div class="hds-advanced-table__tbody" role="rowgroup">
                <div class="hds-advanced-table__tr" role="row">
                  <HdsAdvancedTableThSelectable
                    @selectionScope="row"
                    @isSelected={{false}}
                    @didInsert={{this.mockIndeterminateState}}
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
                    @didInsert={{this.mockIndeterminateState}}
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
                    @didInsert={{this.mockIndeterminateState}}
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

    <ShwDivider @level={{2}} />

    <ShwTextH3>Td</ShwTextH3>

    <ShwFlex @label="Horizontal alignment" as |SF|>
      <SF.Item @grow={{true}}>
        <div
          class="hds-advanced-table hds-advanced-table--density-medium"
          role="grid"
          {{style gridTemplateColumns="repeat(4, 1fr)"}}
        >
          <div class="hds-advanced-table__thead" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>
                Entity
              </HdsAdvancedTableTh>
              <HdsAdvancedTableTh>
                Left
              </HdsAdvancedTableTh>
              <HdsAdvancedTableTh @align="center">
                Center
              </HdsAdvancedTableTh>
              <HdsAdvancedTableTh @align="right">
                Right
              </HdsAdvancedTableTh>
            </div>
          </div>
          <div class="hds-advanced-table__tbody" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Text</HdsAdvancedTableTh>
              <HdsAdvancedTableTd @align="left">Text is left aligned</HdsAdvancedTableTd>
              <HdsAdvancedTableTd @align="center">Text is center aligned</HdsAdvancedTableTd>
              <HdsAdvancedTableTd @align="right">Text is right aligned</HdsAdvancedTableTd>
            </div>
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Icon</HdsAdvancedTableTh>
              <HdsAdvancedTableTd @align="left"><HdsIcon
                  @name="film"
                  @isInline={{true}}
                /></HdsAdvancedTableTd>
              <HdsAdvancedTableTd @align="center"><HdsIcon
                  @name="film"
                  @isInline={{true}}
                /></HdsAdvancedTableTd>
              <HdsAdvancedTableTd @align="right"><HdsIcon
                  @name="film"
                  @isInline={{true}}
                /></HdsAdvancedTableTd>
            </div>
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Icon + Inline text</HdsAdvancedTableTh>
              <HdsAdvancedTableTd @align="left"><HdsIcon
                  @name="film"
                  @isInline={{true}}
                />
                <span>Text in a
                  <code>&lt;span&gt;</code></span></HdsAdvancedTableTd>
              <HdsAdvancedTableTd @align="center"><HdsIcon
                  @name="film"
                  @isInline={{true}}
                />
                <span>Text in a
                  <code>&lt;span&gt;</code></span></HdsAdvancedTableTd>
              <HdsAdvancedTableTd @align="right"><HdsIcon
                  @name="film"
                  @isInline={{true}}
                />
                <span>Text in a
                  <code>&lt;span&gt;</code></span></HdsAdvancedTableTd>
            </div>
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Badge</HdsAdvancedTableTh>
              <HdsAdvancedTableTd @align="left"><HdsBadge
                  @text="Badge"
                /></HdsAdvancedTableTd>
              <HdsAdvancedTableTd @align="center"><HdsBadge
                  @text="Badge"
                /></HdsAdvancedTableTd>
              <HdsAdvancedTableTd @align="right"><HdsBadge
                  @text="Badge"
                /></HdsAdvancedTableTd>
            </div>
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Button (with inline container)</HdsAdvancedTableTh>
              <HdsAdvancedTableTd @align="left">
                <div {{style display="inline-block"}}>
                  <HdsButton
                    @size="small"
                    @icon="plus"
                    @text="Lorem ipsum"
                    @color="secondary"
                  />
                </div>
              </HdsAdvancedTableTd>
              <HdsAdvancedTableTd @align="center">
                <div {{style display="inline-block"}}>
                  <HdsButton
                    @size="small"
                    @icon="plus"
                    @text="Lorem ipsum"
                    @color="secondary"
                  />
                </div>
              </HdsAdvancedTableTd>
              <HdsAdvancedTableTd @align="right">
                <div {{style display="inline-block"}}>
                  <HdsButton
                    @size="small"
                    @icon="plus"
                    @text="Lorem ipsum"
                    @color="secondary"
                  />
                </div>
              </HdsAdvancedTableTd>
            </div>
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Dropdown (with
                <code>@isInline</code>)</HdsAdvancedTableTh>
              <HdsAdvancedTableTd @align="left">
                <HdsDropdown
                  @isInline={{true}}
                  @listPosition="bottom-right"
                  as |dd|
                >
                  <dd.ToggleIcon
                    @icon="more-horizontal"
                    @text="Overflow Options"
                    @hasChevron={{false}}
                    @size="small"
                  />
                  <dd.Interactive
                    @route="page-components.table"
                  >Dropdown</dd.Interactive>
                </HdsDropdown>
              </HdsAdvancedTableTd>
              <HdsAdvancedTableTd @align="center">
                <HdsDropdown
                  @isInline={{true}}
                  @listPosition="bottom-right"
                  as |dd|
                >
                  <dd.ToggleIcon
                    @icon="more-horizontal"
                    @text="Overflow Options"
                    @hasChevron={{false}}
                    @size="small"
                  />
                  <dd.Interactive
                    @route="page-components.table"
                  >Dropdown</dd.Interactive>
                </HdsDropdown>
              </HdsAdvancedTableTd>
              <HdsAdvancedTableTd @align="right">
                <HdsDropdown
                  @isInline={{true}}
                  @listPosition="bottom-right"
                  as |dd|
                >
                  <dd.ToggleIcon
                    @icon="more-horizontal"
                    @text="Overflow Options"
                    @hasChevron={{false}}
                    @size="small"
                  />
                  <dd.Interactive
                    @route="page-components.table"
                  >Dropdown</dd.Interactive>
                </HdsDropdown>
              </HdsAdvancedTableTd>
            </div>
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Tooltip(Button)</HdsAdvancedTableTh>
              <HdsAdvancedTableTd @align="left">
                <HdsTooltipButton @text="Hello!">
                  December 15, 2022,<br />16:40:09 PM
                </HdsTooltipButton>
              </HdsAdvancedTableTd>
              <HdsAdvancedTableTd @align="center">
                <HdsTooltipButton @text="Hello!">
                  December 15, 2022,<br />16:40:09 PM
                </HdsTooltipButton>
              </HdsAdvancedTableTd>
              <HdsAdvancedTableTd @align="right">
                <HdsTooltipButton @text="Hello!">
                  December 15, 2022,<br />16:40:09 PM
                </HdsTooltipButton>
              </HdsAdvancedTableTd>
            </div>
          </div>
        </div>
      </SF.Item>
    </ShwFlex>

    <ShwFlex @label="Vertical alignment" as |SF|>
      <SF.Item @grow={{true}}>
        <div
          class="hds-advanced-table hds-advanced-table--density-medium hds-advanced-table--valign-top"
          role="grid"
          {{style gridTemplateColumns="repeat(8, 1fr)"}}
        >
          <div class="hds-advanced-table__thead" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Spacer</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Text</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Icon</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Icon + Text</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Icon + Text (with flex container)</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Badge</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Dropdown</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Tooltip(Button)</HdsAdvancedTableTh>
            </div>
          </div>
          <div class="hds-advanced-table__tbody" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Top (default)<ShwPlaceholder
                  @height="50"
                /></HdsAdvancedTableTh>
              <HdsAdvancedTableTd>Text is top aligned</HdsAdvancedTableTd>
              <HdsAdvancedTableTd><HdsIcon
                  @name="film"
                  @isInline={{true}}
                /></HdsAdvancedTableTd>
              <HdsAdvancedTableTd><HdsIcon @name="film" @isInline={{true}} />
                <span>Text in a
                  <code>&lt;span&gt;</code></span></HdsAdvancedTableTd>
              <HdsAdvancedTableTd>
                <div {{style display="flex" gap="8px" align-items="center"}}>
                  <HdsIcon @name="film" />
                  <span>Text in a <code>&lt;span&gt;</code></span>
                </div>
              </HdsAdvancedTableTd>
              <HdsAdvancedTableTd><HdsBadge
                  @text="Badge"
                /></HdsAdvancedTableTd>
              <HdsAdvancedTableTd>
                <HdsDropdown as |D|>
                  <D.ToggleIcon
                    @icon="more-horizontal"
                    @text="Overflow Options"
                    @hasChevron={{false}}
                    @size="small"
                  />
                  <D.Interactive
                    @route="page-components.table"
                  >Dropdown</D.Interactive>
                </HdsDropdown>
              </HdsAdvancedTableTd>
              <HdsAdvancedTableTd>
                <HdsTooltipButton @text="Hello!">
                  December 15, 2022,<br />16:40:09 PM
                </HdsTooltipButton>
              </HdsAdvancedTableTd>
            </div>
          </div>
        </div>
      </SF.Item>
      <SF.Item @grow={{true}}>
        <div
          class="hds-advanced-table hds-advanced-table--density-medium hds-advanced-table--valign-middle"
          role="grid"
          {{style gridTemplateColumns="repeat(8, 1fr)"}}
        >
          <div class="hds-advanced-table__thead" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Spacer</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Text</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Icon</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Icon + Text</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Icon + Text (with flex container)</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Badge</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Dropdown</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Tooltip(Button)</HdsAdvancedTableTh>
            </div>
          </div>
          <div class="hds-advanced-table__tbody" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh><ShwPlaceholder
                  @height="25"
                />Middle<ShwPlaceholder @height="25" /></HdsAdvancedTableTh>
              <HdsAdvancedTableTd>Text is middle aligned</HdsAdvancedTableTd>
              <HdsAdvancedTableTd><HdsIcon
                  @name="film"
                  @isInline={{true}}
                /></HdsAdvancedTableTd>
              <HdsAdvancedTableTd><HdsIcon @name="film" @isInline={{true}} />
                <span>Text in a
                  <code>&lt;span&gt;</code></span></HdsAdvancedTableTd>
              <HdsAdvancedTableTd>
                <div {{style display="flex" gap="8px" align-items="center"}}>
                  <HdsIcon @name="film" />
                  <span>Text in a <code>&lt;span&gt;</code></span>
                </div>
              </HdsAdvancedTableTd>
              <HdsAdvancedTableTd><HdsBadge
                  @text="Badge"
                /></HdsAdvancedTableTd>
              <HdsAdvancedTableTd>
                <HdsDropdown as |D|>
                  <D.ToggleIcon
                    @icon="more-horizontal"
                    @text="Overflow Options"
                    @hasChevron={{false}}
                    @size="small"
                  />
                  <D.Interactive
                    @route="page-components.table"
                  >Dropdown</D.Interactive>
                </HdsDropdown>
              </HdsAdvancedTableTd>
              <HdsAdvancedTableTd>
                <HdsTooltipButton @text="Hello!">
                  December 15, 2022,<br />16:40:09 PM
                </HdsTooltipButton>
              </HdsAdvancedTableTd>
            </div>
          </div>
        </div>
      </SF.Item>
      <SF.Item @grow={{true}}>
        <div
          class="hds-advanced-table hds-advanced-table--density-medium hds-advanced-table--valign-baseline"
          role="grid"
          {{style gridTemplateColumns="repeat(8, 1fr)"}}
        >
          <div class="hds-advanced-table__thead" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh>Spacer</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Text</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Icon</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Icon + Text</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Icon + Text (with flex container)</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Badge</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Dropdown</HdsAdvancedTableTh>
              <HdsAdvancedTableTh>Tooltip(Button)</HdsAdvancedTableTh>
            </div>
          </div>
          <div class="hds-advanced-table__tbody" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              <HdsAdvancedTableTh><ShwPlaceholder
                  @height="25"
                />Baseline<ShwPlaceholder @height="25" /></HdsAdvancedTableTh>
              <HdsAdvancedTableTd>Text is middle aligned</HdsAdvancedTableTd>
              <HdsAdvancedTableTd><HdsIcon
                  @name="film"
                  @isInline={{true}}
                /></HdsAdvancedTableTd>
              <HdsAdvancedTableTd><HdsIcon @name="film" @isInline={{true}} />
                <span>Text in a
                  <code>&lt;span&gt;</code></span></HdsAdvancedTableTd>
              <HdsAdvancedTableTd>
                <div {{style display="flex" gap="8px" align-items="center"}}>
                  <HdsIcon @name="film" />
                  <span>Text in a <code>&lt;span&gt;</code></span>
                </div>
              </HdsAdvancedTableTd>
              <HdsAdvancedTableTd><HdsBadge
                  @text="Badge"
                /></HdsAdvancedTableTd>
              <HdsAdvancedTableTd>
                <HdsDropdown as |D|>
                  <D.ToggleIcon
                    @icon="more-horizontal"
                    @text="Overflow Options"
                    @hasChevron={{false}}
                    @size="small"
                  />
                  <D.Interactive
                    @route="page-components.table"
                  >Dropdown</D.Interactive>
                </HdsDropdown>
              </HdsAdvancedTableTd>
              <HdsAdvancedTableTd>
                <HdsTooltipButton @text="Hello!">
                  December 15, 2022,<br />16:40:09 PM
                </HdsTooltipButton>
              </HdsAdvancedTableTd>
            </div>
          </div>
        </div>
      </SF.Item>
    </ShwFlex>

    <ShwTextH3>ThButtonTooltip</ShwTextH3>

    <ShwGrid @label="Interactive states" @columns={{4}} as |SG|>
      {{#each STATES as |state|}}
        <SG.Item @label={{capitalize state}}>
          <HdsAdvancedTableThButtonTooltip
            @tooltip="Here is more information"
            mock-state-value={{state}}
          />
        </SG.Item>
      {{/each}}
    </ShwGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>ThButtonSort</ShwTextH3>

    <ShwGrid @label="Interactive states + Sorting order" @columns={{4}} as |SG|>
      {{#each STATES as |state|}}
        <SG.Item @label={{capitalize state}}>
          <ShwFlex @direction="row" as |SF|>
            <SF.Item>
              <HdsAdvancedTableThButtonSort mock-state-value={{state}} />
            </SF.Item>
            <SF.Item>
              <HdsAdvancedTableThButtonSort
                @sortOrder="asc"
                mock-state-value={{state}}
              />
            </SF.Item>
            <SF.Item>
              <HdsAdvancedTableThButtonSort
                @sortOrder="desc"
                mock-state-value={{state}}
              />
            </SF.Item>
          </ShwFlex>
        </SG.Item>
      {{/each}}
    </ShwGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>ThButtonExpand</ShwTextH3>

    <ShwGrid @label="Interactive states + Expand state" @columns={{4}} as |SG|>
      {{#each STATES as |state|}}
        <SG.Item @label={{capitalize state}}>
          <ShwFlex @direction="row" as |SF|>
            <SF.Item>
              <HdsAdvancedTableThButtonExpand mock-state-value={{state}} />
            </SF.Item>
            <SF.Item>
              <HdsAdvancedTableThButtonExpand
                @isExpanded={{true}}
                mock-state-value={{state}}
              />
            </SF.Item>
          </ShwFlex>
        </SG.Item>
      {{/each}}
    </ShwGrid>

    <ShwGrid
      @label="Expand all interactive states + Expand state"
      @columns={{4}}
      as |SG|
    >
      {{#each STATES as |state|}}
        <SG.Item @label={{capitalize state}}>
          <ShwFlex @direction="row" as |SF|>
            <SF.Item>
              <HdsAdvancedTableThButtonExpand
                mock-state-value={{state}}
                @isExpandAll={{true}}
              />
            </SF.Item>
            <SF.Item>
              <HdsAdvancedTableThButtonExpand
                @isExpanded={{true}}
                mock-state-value={{state}}
                @isExpandAll={{true}}
              />
            </SF.Item>
          </ShwFlex>
        </SG.Item>
      {{/each}}
    </ShwGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>ThContextMenu</ShwTextH3>

    <ShwGrid
      @label="Context menu all interactive states"
      @columns={{4}}
      as |SG|
    >
      {{#each STATES as |state|}}
        <SG.Item @label={{capitalize state}}>
          <div class="hds-advanced-table__th-context-menu">
            <HdsDropdownToggleIcon
              @icon="more-vertical"
              @text="Context menu"
              @hasChevron={{false}}
              @size="small"
              mock-state-value={{state}}
            />
          </div>
        </SG.Item>
      {{/each}}
    </ShwGrid>

    <ShwDivider @level={{2}} />

    <ShwTextH3>ThResizeHandle</ShwTextH3>

    <ShwFlex @direction="row" @gap="2rem" as |SF|>
      <SF.Item @grow={{true}}>
        <div
          class="hds-advanced-table hds-advanced-table--density-medium"
          role="grid"
          {{style gridTemplateColumns="200px 200px 200px 200px 1fr"}}
        >
          <div class="hds-advanced-table__thead" role="rowgroup">
            <div class="hds-advanced-table__tr" role="row">
              {{#each STATES as |state|}}
                <div
                  class="hds-advanced-table__th hds-advanced-table__th--is-resizable"
                  role="columnheader"
                >
                  <HdsLayoutFlex
                    @justify="space-between"
                    @align="center"
                    @gap="8"
                  >
                    <div class="hds-advanced-table__th-content">
                      <span
                        class="hds-advanced-table__th-content-text hds-typography-body-200 hds-font-weight-semibold"
                      >
                        {{capitalize state}}
                      </span>
                    </div>
                    <HdsAdvancedTableThResizeHandle
                      mock-state-value={{state}}
                      @column={{get this.sampleTableModel.columns 0}}
                      aria-valuenow="200"
                    />
                  </HdsLayoutFlex>
                </div>
              {{/each}}
              <HdsAdvancedTableTh>
                Actions
              </HdsAdvancedTableTh>
            </div>
          </div>
        </div>
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwTextH3>ThReorderHandle</ShwTextH3>

    <ShwFlex
      @direction="row"
      @gap="2rem"
      class="shw-component-advanced-table-reorder-handle-container"
      as |SF|
    >
      {{#each STATES as |state|}}
        <SF.Item
          {{style position="relative" height="50px"}}
          @grow={{true}}
          @label={{capitalize state}}
        >
          <HdsAdvancedTableThReorderHandle
            mock-state-value={{state}}
            @column={{get this.sampleTableModel.columns 0}}
            @tableHeight={{110}}
            @onReorderDragStart={{NOOP}}
            @onReorderDragEnd={{NOOP}}
          />
        </SF.Item>
      {{/each}}
    </ShwFlex>
  </template>
}
