/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';
import ShwPlaceholder from 'showcase/components/shw/placeholder';

const ELEVATIONS = ['inset', 'low', 'mid', 'high', 'higher', 'overlay'];

const SubSectionElevation: TemplateOnlyComponent = <template>
  <ShwTextH2>Elevation</ShwTextH2>
  <ShwTextBody>Standalone shadow effects</ShwTextBody>

  <ShwFlex as |SF|>
    {{#each ELEVATIONS as |elevation|}}
      <SF.Item>
        <div class="hds-elevation-{{elevation}}">
          <ShwPlaceholder
            @text={{elevation}}
            @width="100"
            @height="100"
            @background="transparent"
          />
        </div>
      </SF.Item>
    {{/each}}
  </ShwFlex>
</template>;

export default SubSectionElevation;
