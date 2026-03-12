/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { HdsButton, HdsComposite, HdsLayoutFlex } from '@hashicorp/design-system-components/components';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import CompositeWithToolbar from '../code-fragments/with-toolbar';

const SubSectionDefaultCurrentId: TemplateOnlyComponent = <template>
  <ShwTextH2>Default current ID</ShwTextH2>

  <ShwTextH3>Pre-selected item</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    {{! template-lint-disable no-potential-path-strings }}
    <SF.Item
      @label="@defaultCurrentId='preset-third' — the third item starts as the active item"
    >
      <CompositeWithToolbar
        @ariaLabel="Pre-selected"
        @defaultCurrentId="preset-third"
        @role="toolbar"
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Nonexistent ID</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    {{! template-lint-disable no-potential-path-strings }}
    <SF.Item
      @label="@defaultCurrentId='does-not-exist' — when the ID doesn't match any item, no item is initially active"
    >
      <CompositeWithToolbar
        @ariaLabel="Nonexistent ID"
        @defaultCurrentId="does-not-exist"
        @role="toolbar"
      />
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Disabled ID</ShwTextH3>

  <ShwFlex @direction="column" as |SF|>
    {{! template-lint-disable no-potential-path-strings }}
    <SF.Item
      @label="@defaultCurrentId='preset-disabled' — falls back to the first enabled item"
    >
      <HdsComposite @defaultCurrentId="preset-disabled" as |c|>
        <HdsLayoutFlex
          role="toolbar"
          aria-label="Disabled ID"
          @gap="4"
          {{c.composite}}
        >
          <HdsButton {{c.item}} @text="First" id="preset-first" />
          <HdsButton {{c.item disabled=true}} @text="Disabled" id="preset-disabled" />
          <HdsButton {{c.item}} @text="Third" id="preset-third" />
        </HdsLayoutFlex>
      </HdsComposite>
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionDefaultCurrentId;
