/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import CompositeWithGrid from '../code-fragments/with-grid';

const SubSectionWrap: TemplateOnlyComponent = <template>
  <ShwTextH2>Wrap (2D)</ShwTextH2>

  <ShwTextH3>Horizontal wrap</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item
      @label="@wrap='horizontal' | true — ArrowRight at end of row wraps to first item of next row, ArrowLeft at start wraps to last item of previous row"
    >
      <CompositeWithGrid @ariaLabel="Horizontal wrap" @wrap="horizontal" />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Vertical wrap</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    {{! template-lint-disable no-potential-path-strings }}
    <SF.Item
      @label="@wrap='vertical' — ArrowDown at end of column wraps to next column, ArrowUp at start wraps to previous column"
    >
      <CompositeWithGrid @ariaLabel="Vertical wrap" @wrap="vertical" />
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionWrap;
