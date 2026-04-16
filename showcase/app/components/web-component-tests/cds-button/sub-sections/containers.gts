/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';
import style from 'ember-style-modifier';

import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import {
  HdsCdsButton,
  HdsIcon,
} from '@hashicorp/design-system-components/components';

const SubSectionContainers: TemplateOnlyComponent = <template>
  <ShwTextH2>Containers</ShwTextH2>

  <ShwGrid @columns={{3}} as |SG|>
    {{#let (array "block" "flex" "grid" "inline" "inline-flex") as |displays|}}
      {{#each displays as |display|}}
        <SG.Item as |SGI|>
          <SGI.Label>Parent with <code>display: {{display}}</code></SGI.Label>
          <div class="shw-component-button-group" {{style display=display}}>
            <HdsCdsButton @kind="primary">Primary</HdsCdsButton>
            <HdsCdsButton @kind="secondary">Secondary</HdsCdsButton>
            <HdsCdsButton @kind="tertiary">Tertiary</HdsCdsButton>
          </div>
        </SG.Item>
      {{/each}}
    {{/let}}
  </ShwGrid>

  <ShwTextH2>With Icon</ShwTextH2>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item as |SGI|>
      <SGI.Label>Icon only (danger)</SGI.Label>
      <HdsCdsButton @kind="danger" @size="sm" aria-label="Delete">
        <HdsIcon @name="trash" @isInline={{true}} slot="icon" />
      </HdsCdsButton>
    </SG.Item>
    <SG.Item as |SGI|>
      <SGI.Label>With text content</SGI.Label>
      <HdsCdsButton @kind="primary">
        <HdsIcon @name="plus" @isInline={{true}} slot="icon" />
        Add item
      </HdsCdsButton>
    </SG.Item>
    <SG.Item as |SGI|>
      <SGI.Label>Icon only (ghost)</SGI.Label>
      <HdsCdsButton @kind="ghost" aria-label="Close">
        <HdsIcon @name="x" @isInline={{true}} slot="icon" />
      </HdsCdsButton>
    </SG.Item>
  </ShwGrid>
</template>;

export default SubSectionContainers;
