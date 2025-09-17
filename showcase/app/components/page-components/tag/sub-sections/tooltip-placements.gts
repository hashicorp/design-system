/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';

import { HdsTag } from '@hashicorp/design-system-components/components';
import { TOOLTIP_PLACEMENTS } from '@hashicorp/design-system-components/components/hds/tag/index';

const SubSectionTooltipPlacement: TemplateOnlyComponent = <template>
  <ShwTextH2>Tooltip Placements</ShwTextH2>

  <ShwGrid @columns={{3}} as |SG|>
    {{#each TOOLTIP_PLACEMENTS as |place|}}
      <SG.Item>
        <HdsTag
          @text="{{place}} This is a very long text that should go on multiple lines"
          @tooltipPlacement={{place}}
        />
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionTooltipPlacement;
