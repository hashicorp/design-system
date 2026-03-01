/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextBody from 'showcase/components/shw/text/body';

import {
  HdsButton,
  HdsComposite,
  HdsLayoutFlex,
  HdsLayoutGrid,
} from '@hashicorp/design-system-components/components';

const SubSectionDisabledItems: TemplateOnlyComponent = <template>
  <ShwTextH2>Disabled items</ShwTextH2>

  <ShwTextH3>Single disabled item</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item
      @label="Disabled items are skipped during navigation and receive aria-disabled='true'"
    >
      <HdsComposite @orientation="horizontal" as |c|>
        <HdsLayoutFlex
          role="toolbar"
          aria-label="Single disabled"
          @gap="4"
          {{c.composite}}
        >
          <HdsButton {{c.item}} @text="Enabled" />
          <HdsButton {{c.item disabled=true}} disabled @text="Disabled" />
          <HdsButton {{c.item}} @text="Enabled" />
        </HdsLayoutFlex>
      </HdsComposite>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Multiple consecutive disabled items</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="Navigation skips over consecutive disabled items">
      <HdsComposite @orientation="horizontal" as |c|>
        <HdsLayoutFlex
          role="toolbar"
          aria-label="Consecutive disabled"
          @gap="4"
          {{c.composite}}
        >
          <HdsButton {{c.item}} @text="Enabled" />
          <HdsButton {{c.item disabled=true}} disabled @text="Disabled" />
          <HdsButton {{c.item disabled=true}} disabled @text="Disabled" />
          <HdsButton {{c.item disabled=true}} disabled @text="Disabled" />
          <HdsButton {{c.item}} @text="Enabled" />
        </HdsLayoutFlex>
      </HdsComposite>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>All items disabled</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="When all items are disabled, navigation is a no-op">
      <HdsComposite @orientation="horizontal" as |c|>
        <HdsLayoutFlex
          role="toolbar"
          aria-label="All disabled"
          @gap="4"
          {{c.composite}}
        >
          <HdsButton {{c.item disabled=true}} disabled @text="Disabled" />
          <HdsButton {{c.item disabled=true}} disabled @text="Disabled" />
          <HdsButton {{c.item disabled=true}} disabled @text="Disabled" />
        </HdsLayoutFlex>
      </HdsComposite>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Home and End skip disabled items</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item
      @label="Home skips leading disabled items, End skips trailing disabled items"
    >
      <HdsComposite @orientation="horizontal" as |c|>
        <HdsLayoutFlex
          role="toolbar"
          aria-label="Home/End disabled"
          @gap="4"
          {{c.composite}}
        >
          <HdsButton {{c.item disabled=true}} disabled @text="Disabled" />
          <HdsButton {{c.item disabled=true}} disabled @text="Disabled" />
          <HdsButton {{c.item}} @text="First enabled" />
          <HdsButton {{c.item}} @text="Middle" />
          <HdsButton {{c.item}} @text="Last enabled" />
          <HdsButton {{c.item disabled=true}} disabled @text="Disabled" />
        </HdsLayoutFlex>
      </HdsComposite>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Disabled items in 2D grid</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item
      @label="Disabled items are skipped in both row and column navigation"
    >
      <HdsComposite as |c|>
        <div
          class="composite-with-grid"
          role="grid"
          aria-label="Grid with disabled"
          {{c.composite}}
        >
          <HdsLayoutGrid
            class="composite-with-grid__row"
            role="row"
            @gap="8"
            {{c.group}}
          >
            <div class="composite-with-grid__cell" role="gridcell" {{c.item}}>
              <ShwTextBody>A1</ShwTextBody>
            </div>
            <div
              class="composite-with-grid__cell composite-with-grid__cell--disabled"
              {{c.item disabled=true}}
              role="gridcell"
            >
              <ShwTextBody>A2 (disabled)</ShwTextBody>
            </div>
            <div class="composite-with-grid__cell" {{c.item}}>
              <ShwTextBody>A3</ShwTextBody>
            </div>
            <div class="composite-with-grid__cell" {{c.item}}>
              <ShwTextBody>A4</ShwTextBody>
            </div>
          </HdsLayoutGrid>
          <HdsLayoutGrid
            class="composite-with-grid__row"
            role="row"
            @gap="8"
            {{c.group}}
          >
            <div
              class="composite-with-grid__cell composite-with-grid__cell--disabled"
              {{c.item disabled=true}}
              role="gridcell"
            >
              <ShwTextBody>B1 (disabled)</ShwTextBody>
            </div>
            <div class="composite-with-grid__cell" {{c.item}} role="gridcell">
              <ShwTextBody>B2</ShwTextBody>
            </div>
            <div class="composite-with-grid__cell" {{c.item}} role="gridcell">
              <ShwTextBody>B3</ShwTextBody>
            </div>
            <div class="composite-with-grid__cell" {{c.item}} role="gridcell">
              <ShwTextBody>B4</ShwTextBody>
            </div>
          </HdsLayoutGrid>
          <HdsLayoutGrid
            class="composite-with-grid__row"
            role="row"
            @gap="8"
            {{c.group}}
          >
            <div class="composite-with-grid__cell" {{c.item}} role="gridcell">
              <ShwTextBody>C1</ShwTextBody>
            </div>
            <div class="composite-with-grid__cell" {{c.item}} role="gridcell">
              <ShwTextBody>C2</ShwTextBody>
            </div>
            <div
              class="composite-with-grid__cell composite-with-grid__cell--disabled"
              {{c.item disabled=true}}
              role="gridcell"
            >
              <ShwTextBody>C3 (disabled)</ShwTextBody>
            </div>
            <div
              class="composite-with-grid__cell composite-with-grid__cell--disabled"
              {{c.item disabled=true}}
              role="gridcell"
            >
              <ShwTextBody>C4 (disabled)</ShwTextBody>
            </div>
          </HdsLayoutGrid>
        </div>
      </HdsComposite>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionDisabledItems;
