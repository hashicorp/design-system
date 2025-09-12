// Copyright (c) HashiCorp, Inc.
// SPDX-License-Identifier: MPL-2.0

import Component from '@glimmer/component';
import { array } from '@ember/helper';
import { capitalize } from '@ember/string';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwPlaceholder from 'showcase/components/shw/placeholder';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import NOOP from 'showcase/utils/noop';

import {
  HdsBadge,
  HdsButton,
  HdsDropdown,
  HdsIcon,
  HdsTable,
  HdsTableTh,
  HdsTableThSelectable,
  HdsTableThSort,
  HdsTableThButtonSort,
  HdsTableThButtonTooltip,
  HdsTableTr,
  HdsTooltipButton,
} from '@hashicorp/design-system-components/components';

export interface SubSectionBaseElementsSignature {
  Element: HTMLElement;
}

const STATES = ['default', 'hover', 'active', 'focus'];

export default class SubSectionBaseElements extends Component<SubSectionBaseElementsSignature> {
  mockIndeterminateState = (checkbox: HTMLInputElement) => {
    checkbox.indeterminate = true;
  };

  <template>
    <ShwTextH2>Base elements</ShwTextH2>

    <ShwTextH3>ThSort</ShwTextH3>

    <ShwFlex
      @direction="column"
      @label="Interactive states + Sorting order"
      as |SF|
    >
      {{#each STATES as |state|}}
        <SF.Item @grow={{true}}>
          <HdsTable>
            <:head>
              <HdsTableTr>
                <HdsTableThSort
                  mock-state-value={{state}}
                  mock-state-selector="button"
                  @tooltip="Here is more information"
                >
                  Unsorted ({{state}})
                </HdsTableThSort>
                <HdsTableThSort
                  @sortOrder="asc"
                  mock-state-value={{state}}
                  mock-state-selector="button"
                >
                  Ascending
                </HdsTableThSort>
                <HdsTableThSort
                  @sortOrder="desc"
                  mock-state-value={{state}}
                  mock-state-selector="button"
                >
                  Descending
                </HdsTableThSort>
              </HdsTableTr>
            </:head>
            <:body as |B|>
              <B.Tr>
                <B.Td colspan="3" />
              </B.Tr>
            </:body>
          </HdsTable>
        </SF.Item>
      {{/each}}
    </ShwFlex>

    <ShwFlex @label="Alignment" as |SF|>
      <SF.Item @grow={{true}}>
        <HdsTable>
          <:head>
            <HdsTableTr>
              <HdsTableThSort>Left</HdsTableThSort>
              <HdsTableThSort
                @tooltip="Here is more information"
              >Left</HdsTableThSort>
              <HdsTableThSort @align="center">Center</HdsTableThSort>
              <HdsTableThSort
                @align="center"
                @tooltip="Here is more information"
              >Center</HdsTableThSort>
              <HdsTableThSort @align="right">Right</HdsTableThSort>
              <HdsTableThSort
                @align="right"
                @tooltip="Here is more information"
              >Right</HdsTableThSort>
            </HdsTableTr>
          </:head>
          <:body as |B|>
            <B.Tr>
              <B.Td colspan="6" />
            </B.Tr>
          </:body>
        </HdsTable>
      </SF.Item>
    </ShwFlex>

    <ShwFlex @direction="column" @label="Multi-line" as |SF|>
      <SF.Item {{style width="600px"}}>
        <HdsTable>
          <:head>
            <HdsTableTr>
              <HdsTableThSort>
                This is a very long text that should go on two lines
              </HdsTableThSort>
              <HdsTableThSort @tooltip="Here is more information">
                This is a very long text that should go on two lines
              </HdsTableThSort>
            </HdsTableTr>
          </:head>
          <:body as |B|>
            <B.Tr>
              <B.Td colspan="2" />
            </B.Tr>
          </:body>
        </HdsTable>
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwTextH3>Th</ShwTextH3>

    <ShwFlex @label="Interactive states" as |SF|>
      <SF.Item @grow={{true}}>
        <HdsTable>
          <:head>
            <HdsTableTr>
              {{#each STATES as |state|}}
                <HdsTableTh
                  @tooltip="Here is more information"
                  mock-state-value={{state}}
                  mock-state-selector="button"
                >
                  {{capitalize state}}
                </HdsTableTh>
              {{/each}}
            </HdsTableTr>
          </:head>
          <:body as |B|>
            <B.Tr>
              <B.Td colspan="4" />
            </B.Tr>
          </:body>
        </HdsTable>
      </SF.Item>
    </ShwFlex>

    <ShwFlex @label="Alignment" as |SF|>
      <SF.Item @grow={{true}}>
        <HdsTable>
          <:head>
            <HdsTableTr>
              <HdsTableTh>Left</HdsTableTh>
              <HdsTableTh @tooltip="Here is more information">Left</HdsTableTh>
              <HdsTableTh @align="center">Center</HdsTableTh>
              <HdsTableTh
                @align="center"
                @tooltip="Here is more information"
              >Center</HdsTableTh>
              <HdsTableTh @align="right">Right</HdsTableTh>
              <HdsTableTh
                @align="right"
                @tooltip="Here is more information"
              >Right</HdsTableTh>
            </HdsTableTr>
          </:head>
          <:body as |B|>
            <B.Tr>
              <B.Td colspan="6" />
            </B.Tr>
          </:body>
        </HdsTable>
      </SF.Item>
    </ShwFlex>

    <ShwFlex @direction="column" as |SF|>
      <SF.Item @label="Th with custom width" @grow={{true}}>
        <HdsTable>
          <:head as |H|>
            <H.Tr>
              <H.Th>Auto</H.Th>
              <H.Th>Auto</H.Th>
              <H.Th>Auto</H.Th>
              <H.Th @width="100px">Custom</H.Th>
            </H.Tr>
          </:head>
          <:body as |B|>
            <B.Tr>
              <B.Th>Scope Row</B.Th>
              <B.Td>Cell Content</B.Td>
              <B.Td>Cell Content</B.Td>
              <B.Td>100px</B.Td>
            </B.Tr>
          </:body>
        </HdsTable>
      </SF.Item>
      <SF.Item @label="Th with visually hidden text" @grow={{true}}>
        <HdsTable>
          <:head as |H|>
            <H.Tr>
              <H.Th>Lorem</H.Th>
              <H.Th>Ipsum</H.Th>
              <H.Th>Dolor</H.Th>
              <H.Th @isVisuallyHidden={{true}}>Sit amet</H.Th>
            </H.Tr>
          </:head>
          <:body as |B|>
            <B.Tr>
              <B.Th>Scope Row</B.Th>
              <B.Td>Cell Content</B.Td>
              <B.Td>Cell Content</B.Td>
              <B.Td>Cell Content</B.Td>
            </B.Tr>
            <B.Tr>
              <B.Th @isVisuallyHidden={{true}}>Scope Row</B.Th>
              <B.Td>Cell Content</B.Td>
              <B.Td>Cell Content</B.Td>
              <B.Td>Cell Content</B.Td>
            </B.Tr>
          </:body>
        </HdsTable>
      </SF.Item>
    </ShwFlex>

    <ShwFlex @direction="column" @label="Multi-line" as |SF|>
      <SF.Item {{style width="600px"}}>
        <HdsTable>
          <:head>
            <HdsTableTr>
              <HdsTableTh>
                This is a very long text that should go on two lines
              </HdsTableTh>
              <HdsTableTh @tooltip="Here is more information">
                This is a very long text that should go on two lines
              </HdsTableTh>
            </HdsTableTr>
          </:head>
          <:body as |B|>
            <B.Tr>
              <B.Td colspan="2" />
            </B.Tr>
          </:body>
        </HdsTable>
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
              <HdsTable>
                <:head as |H|>
                  <H.Tr>
                    <HdsTableThSelectable
                      @selectionScope="col"
                      @isSelected={{bool1}}
                      @onClickSortBySelected={{if bool2 NOOP}}
                    />
                    <H.Th>Lorem</H.Th>
                  </H.Tr>
                </:head>
                <:body as |B|>
                  <B.Tr>
                    <HdsTableThSelectable
                      @selectionScope="row"
                      @isSelected={{bool1}}
                    />
                    <B.Td>Ipsum</B.Td>
                  </B.Tr>
                </:body>
              </HdsTable>
              <br />
              <HdsTable>
                <:head as |H|>
                  <H.Tr>
                    <HdsTableThSelectable
                      @selectionScope="col"
                      @isSelected={{bool1}}
                      @onClickSortBySelected={{if bool2 NOOP}}
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
                      @isSelected={{bool1}}
                      mock-state-value="focus"
                      mock-state-selector="input"
                    />
                    <B.Td>Ipsum</B.Td>
                  </B.Tr>
                </:body>
              </HdsTable>
            </SF.Item>
          {{/each}}
        {{/each}}
      {{/let}}
      {{#let (array false true) as |booleans|}}
        {{#each booleans as |bool|}}
          <SF.Item @label="Indeterminate {{if bool ' with sort'}}">
            <HdsTable>
              <:head as |H|>
                <H.Tr>
                  <HdsTableThSelectable
                    @selectionScope="col"
                    @isSelected={{true}}
                    @onClickSortBySelected={{if bool NOOP}}
                    @didInsert={{this.mockIndeterminateState}}
                  />
                  <H.Th>Lorem</H.Th>
                </H.Tr>
              </:head>
              <:body as |B|>
                <B.Tr @selectionKey="row">
                  <HdsTableThSelectable
                    @selectionScope="row"
                    @isSelected={{false}}
                    @didInsert={{this.mockIndeterminateState}}
                  />
                  <B.Td>Ipsum</B.Td>
                </B.Tr>
              </:body>
            </HdsTable>
            <br />
            <HdsTable>
              <:head as |H|>
                <H.Tr>
                  <HdsTableThSelectable
                    @selectionScope="col"
                    @isSelected={{true}}
                    @didInsert={{this.mockIndeterminateState}}
                    @onClickSortBySelected={{if bool NOOP}}
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
                    @isSelected={{false}}
                    @didInsert={{this.mockIndeterminateState}}
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

    <ShwTextH3>Td</ShwTextH3>

    <ShwFlex @label="Horizontal alignment" as |SF|>
      <SF.Item @grow={{true}}>
        <HdsTable>
          <:head as |H|>
            <H.Tr>
              <H.Th @align="left">Entity</H.Th>
              <H.Th @align="left">Left</H.Th>
              <H.Th @align="center">Center</H.Th>
              <H.Th @align="right">Right</H.Th>
            </H.Tr>
          </:head>
          <:body as |B|>
            <B.Tr>
              <B.Th>Text</B.Th>
              <B.Td @align="left">Text is left aligned</B.Td>
              <B.Td @align="center">Text is center aligned</B.Td>
              <B.Td @align="right">Text is right aligned</B.Td>
            </B.Tr>
            <B.Tr>
              <B.Th>Icon</B.Th>
              <B.Td @align="left"><HdsIcon
                  @name="film"
                  @isInline={{true}}
                /></B.Td>
              <B.Td @align="center"><HdsIcon
                  @name="film"
                  @isInline={{true}}
                /></B.Td>
              <B.Td @align="right"><HdsIcon
                  @name="film"
                  @isInline={{true}}
                /></B.Td>
            </B.Tr>
            <B.Tr>
              <B.Th>Icon + Inline text</B.Th>
              <B.Td @align="left"><HdsIcon @name="film" @isInline={{true}} />
                <span>Text in a <code>&lt;span&gt;</code></span></B.Td>
              <B.Td @align="center"><HdsIcon @name="film" @isInline={{true}} />
                <span>Text in a <code>&lt;span&gt;</code></span></B.Td>
              <B.Td @align="right"><HdsIcon @name="film" @isInline={{true}} />
                <span>Text in a <code>&lt;span&gt;</code></span></B.Td>
            </B.Tr>
            <B.Tr>
              <B.Th>Badge</B.Th>
              <B.Td @align="left"><HdsBadge @text="Badge" /></B.Td>
              <B.Td @align="center"><HdsBadge @text="Badge" /></B.Td>
              <B.Td @align="right"><HdsBadge @text="Badge" /></B.Td>
            </B.Tr>
            <B.Tr>
              <B.Th>Button (with inline container)</B.Th>
              <B.Td @align="left">
                <div {{style display="inline-block"}}>
                  <HdsButton
                    @size="small"
                    @icon="plus"
                    @text="Lorem ipsum"
                    @color="secondary"
                  />
                </div>
              </B.Td>
              <B.Td @align="center">
                <div {{style display="inline-block"}}>
                  <HdsButton
                    @size="small"
                    @icon="plus"
                    @text="Lorem ipsum"
                    @color="secondary"
                  />
                </div>
              </B.Td>
              <B.Td @align="right">
                <div {{style display="inline-block"}}>
                  <HdsButton
                    @size="small"
                    @icon="plus"
                    @text="Lorem ipsum"
                    @color="secondary"
                  />
                </div>
              </B.Td>
            </B.Tr>
            <B.Tr>
              <B.Th>Dropdown (with <code>@isInline</code>)</B.Th>
              <B.Td @align="left">
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
              </B.Td>
              <B.Td @align="center">
                <HdsDropdown @isInline={{true}} as |dd|>
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
              </B.Td>
              <B.Td @align="right">
                <HdsDropdown @isInline={{true}} as |dd|>
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
              </B.Td>
            </B.Tr>
            <B.Tr>
              <B.Th>Tooltip(Button)</B.Th>
              <B.Td @align="left">
                <HdsTooltipButton @text="Hello!">
                  December 15, 2022,<br />16:40:09 PM
                </HdsTooltipButton>
              </B.Td>
              <B.Td @align="center">
                <HdsTooltipButton @text="Hello!">
                  December 15, 2022,<br />16:40:09 PM
                </HdsTooltipButton>
              </B.Td>
              <B.Td @align="right">
                <HdsTooltipButton @text="Hello!">
                  December 15, 2022,<br />16:40:09 PM
                </HdsTooltipButton>
              </B.Td>
            </B.Tr>
          </:body>
        </HdsTable>
      </SF.Item>
    </ShwFlex>

    <ShwFlex @label="Vertical alignment" as |SF|>
      <SF.Item @grow={{true}}>
        <HdsTable @valign="top" @isSelectable={{true}}>
          <:head as |H|>
            <H.Tr>
              <H.Th>Spacer</H.Th>
              <H.Th>Text</H.Th>
              <H.Th>Icon</H.Th>
              <H.Th>Icon + Text</H.Th>
              <H.Th>Icon + Text (with flex container)</H.Th>
              <H.Th>Badge</H.Th>
              <H.Th>Dropdown</H.Th>
              <H.Th>Tooltip(Button)</H.Th>
            </H.Tr>
          </:head>
          <:body as |B|>
            <B.Tr @selectionKey="row">
              <B.Th>Top (default)<ShwPlaceholder @height="50" /></B.Th>
              <B.Td>Text is top aligned</B.Td>
              <B.Td><HdsIcon @name="film" @isInline={{true}} /></B.Td>
              <B.Td><HdsIcon @name="film" @isInline={{true}} />
                <span>Text in a <code>&lt;span&gt;</code></span></B.Td>
              <B.Td>
                <div {{style display="flex" gap="8px" align-items="center"}}>
                  <HdsIcon @name="film" />
                  <span>Text in a <code>&lt;span&gt;</code></span>
                </div>
              </B.Td>
              <B.Td><HdsBadge @text="Badge" /></B.Td>
              <B.Td>
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
              </B.Td>
              <B.Td>
                <HdsTooltipButton @text="Hello!">
                  December 15, 2022,<br />16:40:09 PM
                </HdsTooltipButton>
              </B.Td>
            </B.Tr>
          </:body>
        </HdsTable>
      </SF.Item>
      <SF.Item @grow={{true}}>
        <HdsTable @valign="middle" @isSelectable={{true}}>
          <:head as |H|>
            <H.Tr>
              <H.Th>Spacer</H.Th>
              <H.Th>Text</H.Th>
              <H.Th>Icon</H.Th>
              <H.Th>Icon + Text</H.Th>
              <H.Th>Icon + Text (with flex container)</H.Th>
              <H.Th>Badge</H.Th>
              <H.Th>Dropdown</H.Th>
              <H.Th>Tooltip(Button)</H.Th>
            </H.Tr>
          </:head>
          <:body as |B|>
            <B.Tr @selectionKey="row">
              <B.Th><ShwPlaceholder @height="25" />Middle<ShwPlaceholder
                  @height="25"
                /></B.Th>
              <B.Td>Text is middle aligned</B.Td>
              <B.Td><HdsIcon @name="film" @isInline={{true}} /></B.Td>
              <B.Td><HdsIcon @name="film" @isInline={{true}} />
                <span>Text in a <code>&lt;span&gt;</code></span></B.Td>
              <B.Td>
                <div {{style display="flex" gap="8px" align-items="center"}}>
                  <HdsIcon @name="film" />
                  <span>Text in a <code>&lt;span&gt;</code></span>
                </div>
              </B.Td>
              <B.Td><HdsBadge @text="Badge" /></B.Td>
              <B.Td>
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
              </B.Td>
              <B.Td>
                <HdsTooltipButton @text="Hello!">
                  December 15, 2022,<br />16:40:09 PM
                </HdsTooltipButton>
              </B.Td>
            </B.Tr>
          </:body>
        </HdsTable>
      </SF.Item>
      <SF.Item @grow={{true}}>
        <HdsTable @valign="baseline" @isSelectable={{true}}>
          <:head as |H|>
            <H.Tr>
              <H.Th>Spacer</H.Th>
              <H.Th>Text</H.Th>
              <H.Th>Icon</H.Th>
              <H.Th>Icon + Text</H.Th>
              <H.Th>Icon + Text (with flex container)</H.Th>
              <H.Th>Badge</H.Th>
              <H.Th>Dropdown</H.Th>
              <H.Th>Tooltip(Button)</H.Th>
            </H.Tr>
          </:head>
          <:body as |B|>
            <B.Tr @selectionKey="row">
              <B.Th><ShwPlaceholder @height="25" />Baseline<ShwPlaceholder
                  @height="25"
                /></B.Th>
              <B.Td>Text is middle aligned</B.Td>
              <B.Td><HdsIcon @name="film" @isInline={{true}} /></B.Td>
              <B.Td><HdsIcon @name="film" @isInline={{true}} />
                <span>Text in a <code>&lt;span&gt;</code></span></B.Td>
              <B.Td>
                <div {{style display="flex" gap="8px" align-items="center"}}>
                  <HdsIcon @name="film" @isInline={{true}} />
                  <span>Text in a <code>&lt;span&gt;</code></span>
                </div>
              </B.Td>
              <B.Td><HdsBadge @text="Badge" /></B.Td>
              <B.Td>
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
              </B.Td>
              <B.Td>
                <HdsTooltipButton @text="Hello!">
                  December 15, 2022,<br />16:40:09 PM
                </HdsTooltipButton>
              </B.Td>
            </B.Tr>
          </:body>
        </HdsTable>
      </SF.Item>
    </ShwFlex>

    <ShwDivider @level={{2}} />

    <ShwTextH3>ThButtonTooltip</ShwTextH3>

    <ShwGrid @label="Interactive states" @columns={{4}} as |SG|>
      {{#each STATES as |state|}}
        <SG.Item @label={{capitalize state}}>
          <HdsTableThButtonTooltip
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
              <HdsTableThButtonSort mock-state-value={{state}} />
            </SF.Item>
            <SF.Item>
              <HdsTableThButtonSort
                @sortOrder="asc"
                mock-state-value={{state}}
              />
            </SF.Item>
            <SF.Item>
              <HdsTableThButtonSort
                @sortOrder="desc"
                mock-state-value={{state}}
              />
            </SF.Item>
          </ShwFlex>
        </SG.Item>
      {{/each}}
    </ShwGrid>
  </template>
}
