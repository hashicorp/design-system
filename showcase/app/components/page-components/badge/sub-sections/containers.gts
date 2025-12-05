/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';
import style from 'ember-style-modifier';

import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsBadge } from '@hashicorp/design-system-components/components';

const SubSectionContainers: TemplateOnlyComponent = <template>
  <ShwTextH2>Containers</ShwTextH2>

  <ShwGrid @columns={{3}} as |SG|>
    {{#let (array "block" "flex" "grid") as |displays|}}
      {{#each displays as |display|}}
        <SG.Item as |SGI|>
          <SGI.Label>Parent with <code>display: {{display}}</code></SGI.Label>
          <div class="shw-component-badge-group" {{style display=display}}>
            <HdsBadge @text="Only text" /><HdsBadge
              @icon="activity"
              @text="Text + icon"
            /><HdsBadge
              @icon="activity"
              @text="Only icon"
              @isIconOnly={{true}}
            />
          </div>
        </SG.Item>
      {{/each}}
    {{/let}}
  </ShwGrid>
</template>;

export default SubSectionContainers;
