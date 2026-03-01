/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import CompositeWithToolbar from '../code-fragments/with-toolbar';

const SubSectionOrientation: TemplateOnlyComponent = <template>
  <ShwTextH2>Orientation</ShwTextH2>

  <ShwTextH3>Horizontal</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item
      @label="ArrowRight / ArrowLeft to navigate. ArrowUp / ArrowDown are ignored."
    >
      <CompositeWithToolbar
        @ariaLabel="Horizontal orientation"
        @orientation="horizontal"
        @role="toolbar"
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Vertical</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item
      @label="ArrowDown / ArrowUp to navigate. ArrowLeft / ArrowRight are ignored."
    >
      <CompositeWithToolbar
        @ariaLabel="Vertical orientation"
        @orientation="vertical"
        @role="listbox"
        @direction="column"
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>No orientation (both axes)</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item
      @label="All four arrow keys navigate linearly when no groups are present."
    >
      <CompositeWithToolbar @ariaLabel="No orientation" @role="toolbar" />
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionOrientation;
