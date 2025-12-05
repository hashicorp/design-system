/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

const SURFACES = ['inset', 'base', 'low', 'mid', 'high', 'higher', 'overlay'];

const SubSectionSurface: TemplateOnlyComponent = <template>
  <ShwTextH2>Surface</ShwTextH2>
  <ShwTextBody>Shadow effects combined with an additional edge</ShwTextBody>

  <ShwFlex as |SF|>
    {{#each SURFACES as |surface|}}
      <SF.Item>
        <div class="hds-surface-{{surface}}">
          <ShwPlaceholder
            @text={{surface}}
            @width="100"
            @height="100"
            @background="transparent"
          />
        </div>
      </SF.Item>
    {{/each}}
  </ShwFlex>
</template>;

export default SubSectionSurface;
