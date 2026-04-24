/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';
import style from 'ember-style-modifier';
import { capitalize } from '@ember/string';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import NOOP from 'showcase/utils/noop';

import {
  HdsPaginationNavArrow,
  HdsPaginationNavEllipsis,
  HdsPaginationInfo,
  HdsPaginationSizeSelector,
  HdsPaginationNavNumber,
} from '@hashicorp/design-system-components/components';

const SubSectionBaseElements: TemplateOnlyComponent = <template>
  <ShwTextH2>Base elements</ShwTextH2>

  <ShwTextH3>PaginationInfo</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item as |SFI|>
      <SFI.Label>Base (default)</SFI.Label>
      <HdsPaginationInfo
        @itemsRangeStart={{1}}
        @itemsRangeEnd={{10}}
        @totalItems={{103}}
      />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With
        <code>@showTotalItems=&lcub;&lcub;false&rcub;&rcub;</code></SFI.Label>
      <HdsPaginationInfo
        @itemsRangeStart={{1}}
        @itemsRangeEnd={{10}}
        @totalItems={{103}}
        @showTotalItems={{false}}
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>PaginationSizeSelector</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item as |SFI|>
      <SFI.Label>Base (default)</SFI.Label>
      <HdsPaginationSizeSelector @pageSizes={{array 10 30 50}} />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With
        <code>@currentPageSize</code>
        (selected option)</SFI.Label>
      <HdsPaginationSizeSelector
        @pageSizes={{array 10 30 50}}
        @selectedSize={{30}}
      />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With
        <code>@label</code>
        to add custom label text</SFI.Label>
      <HdsPaginationSizeSelector @pageSizes={{array 10 30 50}} @label="Items" />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>PaginationNavArrow</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item as |SFI|>
      <SFI.Label>With text label (default)</SFI.Label>
      <ShwGrid @columns={{2}} as |SG|>
        <SG.Item>
          <HdsPaginationNavArrow @direction="prev" />
        </SG.Item>
        <SG.Item>
          <HdsPaginationNavArrow @direction="next" />
        </SG.Item>
      </ShwGrid>
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>With
        <code>@showLabel=&lcub;&lcub;false&rcub;&rcub;</code></SFI.Label>
      <ShwGrid @columns={{2}} {{style width="fit-content"}} as |SG|>
        <SG.Item>
          <HdsPaginationNavArrow @direction="prev" @showLabel={{false}} />
        </SG.Item>
        <SG.Item>
          <HdsPaginationNavArrow @direction="next" @showLabel={{false}} />
        </SG.Item>
      </ShwGrid>
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>States</ShwTextH4>

  <ShwFlex @direction="column" as |SF|>
    {{#let (array "default" "hover" "active" "focus") as |states|}}
      {{#each states as |state|}}
        <SF.Item
          @label={{capitalize state}}
          mock-state-value={{state}}
          mock-state-selector="button,a"
        >
          <ShwFlex as |SF|>
            <SF.Item>
              <HdsPaginationNavArrow @direction="prev" />
            </SF.Item>
            <SF.Item>
              <HdsPaginationNavArrow @direction="next" />
            </SF.Item>
            <SF.Item>
              <HdsPaginationNavArrow @direction="prev" @showLabel={{false}} />
            </SF.Item>
            <SF.Item>
              <HdsPaginationNavArrow @direction="next" @showLabel={{false}} />
            </SF.Item>
          </ShwFlex>
        </SF.Item>
      {{/each}}
      <SF.Item @label="Disabled">
        <ShwFlex as |SF|>
          <SF.Item>
            <HdsPaginationNavArrow @direction="prev" @disabled={{true}} />
          </SF.Item>
          <SF.Item>
            <HdsPaginationNavArrow @direction="next" @disabled={{true}} />
          </SF.Item>
          <SF.Item>
            <HdsPaginationNavArrow
              @direction="prev"
              @showLabel={{false}}
              @disabled={{true}}
            />
          </SF.Item>
          <SF.Item>
            <HdsPaginationNavArrow
              @direction="next"
              @showLabel={{false}}
              @disabled={{true}}
            />
          </SF.Item>
        </ShwFlex>
      </SF.Item>
    {{/let}}
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>PaginationNavNumber</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item as |SFI|>
      <SFI.Label>Generic (default)</SFI.Label>
      <HdsPaginationNavNumber
        @page={{1}}
        @isSelected={{false}}
        @onClick={{NOOP}}
      />
    </SF.Item>
    <SF.Item as |SFI|>
      <SFI.Label>Current (with
        <code>@isSelected=&lcub;&lcub;true&rcub;&rcub;</code>)</SFI.Label>
      <HdsPaginationNavNumber
        @page={{1}}
        @isSelected={{true}}
        @onClick={{NOOP}}
      />
    </SF.Item>
  </ShwFlex>

  <ShwTextH4>States</ShwTextH4>
  <ShwTextBody>Generic / Current - With different text lengths</ShwTextBody>

  <ShwFlex @direction="column" as |SF|>
    {{#let (array "default" "hover" "active" "focus") as |states|}}
      {{#each states as |state|}}
        <SF.Item
          @label={{capitalize state}}
          mock-state-value={{state}}
          mock-state-selector="button,a"
        >
          <ShwFlex as |SF|>
            <SF.Item>
              <HdsPaginationNavNumber
                @page={{1}}
                @isSelected={{false}}
                @onClick={{NOOP}}
              />
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
                @page={{123}}
                @isSelected={{false}}
                @onClick={{NOOP}}
              />
            </SF.Item>
            <SF.Item>
              <HdsPaginationNavNumber
                @page={{1}}
                @isSelected={{true}}
                @onClick={{NOOP}}
              />
            </SF.Item>
            <SF.Item>
              <HdsPaginationNavNumber
                @page={{12}}
                @isSelected={{true}}
                @onClick={{NOOP}}
              />
            </SF.Item>
            <SF.Item>
              <HdsPaginationNavNumber
                @page={{123}}
                @isSelected={{true}}
                @onClick={{NOOP}}
              />
            </SF.Item>
          </ShwFlex>
        </SF.Item>
      {{/each}}
    {{/let}}
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>PaginationNavEllipsis</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Base">
      <HdsPaginationNavEllipsis />
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionBaseElements;
