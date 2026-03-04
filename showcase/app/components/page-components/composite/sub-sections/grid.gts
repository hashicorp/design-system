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

import CompositeWithGrid from '../code-fragments/with-grid';

import {
  HdsComposite,
  HdsLayoutGrid,
} from '@hashicorp/design-system-components/components';

const SubSectionGrid: TemplateOnlyComponent = <template>
  <ShwTextH2>2D grid navigation</ShwTextH2>

  <ShwTextH3>Basic grid</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item
      @label="ArrowLeft/Right within rows, ArrowUp/Down across rows. Home/End for row edges. Ctrl+Home/End for grid edges. PageUp/PageDown for column edges."
    >
      <CompositeWithGrid @ariaLabel="Basic grid" />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Uneven row sizes</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item
      @label="ArrowDown to a shorter row lands on the last item in that row"
    >
      <HdsComposite as |c|>
        <div
          class="composite-with-grid"
          role="grid"
          aria-label="Uneven grid"
          {{c.composite}}
        >
          <HdsLayoutGrid
            @columnWidth="25%"
            @gap="8"
            role="row"
            class="composite-with-grid__row"
            {{c.group}}
          >
            <div class="composite-with-grid__cell" role="gridcell" {{c.item}}>
              <ShwTextBody>A1</ShwTextBody>
            </div>
            <div class="composite-with-grid__cell" role="gridcell" {{c.item}}>
              <ShwTextBody>A2</ShwTextBody>
            </div>
            <div class="composite-with-grid__cell" role="gridcell" {{c.item}}>
              <ShwTextBody>A3</ShwTextBody>
            </div>
            <div class="composite-with-grid__cell" role="gridcell" {{c.item}}>
              <ShwTextBody>A4</ShwTextBody>
            </div>
          </HdsLayoutGrid>
          <HdsLayoutGrid
            @columnWidth="25%"
            @gap="8"
            role="row"
            class="composite-with-grid__row"
            {{c.group}}
          >
            <div class="composite-with-grid__cell" role="gridcell" {{c.item}}>
              <ShwTextBody>B1</ShwTextBody>
            </div>
            <div class="composite-with-grid__cell" role="gridcell" {{c.item}}>
              <ShwTextBody>B2</ShwTextBody>
            </div>
          </HdsLayoutGrid>
          <HdsLayoutGrid
            @columnWidth="25%"
            @gap="8"
            role="row"
            class="composite-with-grid__row"
            {{c.group}}
          >
            <div class="composite-with-grid__cell" role="gridcell" {{c.item}}>
              <ShwTextBody>C1</ShwTextBody>
            </div>
            <div class="composite-with-grid__cell" role="gridcell" {{c.item}}>
              <ShwTextBody>C2</ShwTextBody>
            </div>
            <div class="composite-with-grid__cell" role="gridcell" {{c.item}}>
              <ShwTextBody>C3</ShwTextBody>
            </div>
          </HdsLayoutGrid>
        </div>
      </HdsComposite>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Grid with orientation override</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item
      @label="Setting @orientation forces 1D navigation even with groups present"
    >
      <CompositeWithGrid
        @ariaLabel="Orientation override"
        @orientation="horizontal"
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionGrid;
