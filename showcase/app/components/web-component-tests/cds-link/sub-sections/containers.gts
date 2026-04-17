/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';
import style from 'ember-style-modifier';

import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsCdsLink } from '@hashicorp/design-system-components/components';

const SubSectionContainers: TemplateOnlyComponent = <template>
  <ShwTextH2>Containers</ShwTextH2>

  <ShwGrid @columns={{3}} as |SG|>
    {{#let (array "block" "flex" "grid" "inline" "inline-flex") as |displays|}}
      {{#each displays as |display|}}
        <SG.Item as |SGI|>
          <SGI.Label>Parent with <code>display: {{display}}</code></SGI.Label>
          <div class="shw-component-link-group" {{style display=display}}>
            <HdsCdsLink href="https://hashicorp.com">Primary link</HdsCdsLink>
            <HdsCdsLink @size="sm" href="https://hashicorp.com">Small link</HdsCdsLink>
          </div>
        </SG.Item>
      {{/each}}
    {{/let}}
  </ShwGrid>

  <ShwTextH2>Link with target and rel</ShwTextH2>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item as |SGI|>
      <SGI.Label>Open in new tab</SGI.Label>
      <HdsCdsLink
        @href="https://hashicorp.com"
        @target="_blank"
        @rel="noopener noreferrer"
      >
        External link
      </HdsCdsLink>
    </SG.Item>
    <SG.Item as |SGI|>
      <SGI.Label>Download link</SGI.Label>
      <HdsCdsLink @href="/files/document.pdf" @download="document.pdf">
        Download PDF
      </HdsCdsLink>
    </SG.Item>
    <SG.Item as |SGI|>
      <SGI.Label>With hreflang</SGI.Label>
      <HdsCdsLink @href="https://hashicorp.com" @hreflang="en">
        English version
      </HdsCdsLink>
    </SG.Item>
  </ShwGrid>
</template>;

export default SubSectionContainers;
