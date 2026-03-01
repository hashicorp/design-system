/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import CompositeWithGrid from '../code-fragments/with-grid';
import CompositeWithToolbar from '../code-fragments/with-toolbar';

import {
  HdsButton,
  HdsComposite,
  HdsLayoutFlex,
} from '@hashicorp/design-system-components/components';

const SubSectionLoop: TemplateOnlyComponent = <template>
  <ShwTextH2>Loop</ShwTextH2>

  <ShwTextH3>1D loop</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="@loop={{true}} - wraps from last to first and vice versa">
      <CompositeWithToolbar
        @ariaLabel="Loop demo"
        @loop={{true}}
        @orientation="horizontal"
        @role="toolbar"
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Per-axis loop</ShwTextH3>

  <ShwTextH4 @tag="h3">Horizontal only</ShwTextH4>

  <ShwFlex @direction="column" as |SF|>
    {{! template-lint-disable no-potential-path-strings }}
    <SF.Item
      @label="@loop='horizontal' - loops within rows in 2D, no vertical looping"
    >
      <CompositeWithGrid @ariaLabel="Horizontal loop grid" @loop="horizontal" />
    </SF.Item>
  </ShwFlex>

  <ShwTextH4 @tag="h3">Vertical only</ShwTextH4>

  <ShwFlex @direction="column" as |SF|>
    {{! template-lint-disable no-potential-path-strings }}
    <SF.Item
      @label="@loop='vertical' - loops across rows in the same column, no horizontal looping"
    >
      <CompositeWithGrid @ariaLabel="Vertical loop grid" @loop="vertical" />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Loop with disabled items</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="Disabled items are skipped when looping">
      <HdsComposite @orientation="horizontal" @loop={{true}} as |c|>
        <HdsLayoutFlex
          role="toolbar"
          aria-label="Loop with disabled"
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

  <ShwDivider />
</template>;

export default SubSectionLoop;
