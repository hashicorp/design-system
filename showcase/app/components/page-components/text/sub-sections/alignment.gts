/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';
import ShwOutliner from 'showcase/components/shw/outliner';

import { ALIGNS } from '@hashicorp/design-system-components/components/hds/text/index';

import { HdsTextBody } from '@hashicorp/design-system-components/components';

const SubSectionAlignment: TemplateOnlyComponent = <template>
  <ShwTextH2>Alignment</ShwTextH2>
  <ShwGrid @columns={{3}} as |SG|>
    {{#each ALIGNS as |alignment|}}
      <SG.Item>
        <ShwFlex @direction="column" as |SF|>
          <SF.Item @label="parent with text-align={{alignment}}">
            <ShwOutliner {{style textAlign=alignment}}>
              <HdsTextBody @size="200" @tag="p">The fox jumped over the lazy dog</HdsTextBody>
            </ShwOutliner>
          </SF.Item>
          <SF.Item @label="with @align={{alignment}}">
            <ShwOutliner>
              <HdsTextBody @size="200" @tag="p" @align={{alignment}}>The fox
                jumped over the lazy dog</HdsTextBody>
            </ShwOutliner>
          </SF.Item>
        </ShwFlex>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionAlignment;
