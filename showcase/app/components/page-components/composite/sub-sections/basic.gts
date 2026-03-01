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

import {
  HdsButton,
  HdsComposite,
} from '@hashicorp/design-system-components/components';

const SubSectionBasic: TemplateOnlyComponent = <template>
  <ShwTextH2>Basic</ShwTextH2>

  <ShwTextH3>Horizontal toolbar (roving tabindex)</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="Default">
      <CompositeWithToolbar
        @ariaLabel="Formatting"
        @orientation="horizontal"
        @role="toolbar"
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Vertical list</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="Default">
      <CompositeWithToolbar
        @ariaLabel="Options"
        @orientation="vertical"
        @role="listbox"
        @direction="column"
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Single item</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    <SF.Item @label="Navigation is a no-op with one item">
      <HdsComposite @orientation="horizontal" as |c|>
        <div role="toolbar" aria-label="Single item" {{c.composite}}>
          <HdsButton {{c.item}} @text="Only Item" />
        </div>
      </HdsComposite>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionBasic;
