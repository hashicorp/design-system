/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';
import { array } from '@ember/helper';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import NOOP from 'showcase/utils/noop';

import { HdsTag } from '@hashicorp/design-system-components/components';

const SubSectionContainers: TemplateOnlyComponent = <template>
  <ShwTextH2>Containers</ShwTextH2>

  <ShwGrid @columns={{3}} as |SG|>
    {{#let (array "block" "flex" "grid") as |displays|}}
      {{#each displays as |display|}}
        <SG.Item as |SGI|>
          <SGI.Label>Parent with <code>display: {{display}}</code></SGI.Label>
          <div
            class="shw-component-tag-group"
            {{style display=display flex-wrap="wrap"}}
          >
            <HdsTag @text="My text tag" @onDismiss={{NOOP}} />
            <HdsTag @text="My text tag" @onDismiss={{NOOP}} />
            <HdsTag @text="My slightly longer tag" @onDismiss={{NOOP}} />
            <HdsTag @text="My text tag" @onDismiss={{NOOP}} />
            <HdsTag
              @text="This is a very long text that should go on multiple lines"
              @onDismiss={{NOOP}}
            />
          </div>
        </SG.Item>
      {{/each}}
    {{/let}}
  </ShwGrid>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionContainers;
