/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import {
  CDS_ACCORDION_SIZE_OPTIONS,
  CDS_ACCORDION_ALIGNMENT_OPTIONS,
} from '@hashicorp/design-system-components/components/hds/cds-accordion/index';

import CodeFragmentBasicExample from '../code-fragments/basic-example';

const SubSectionVariants: TemplateOnlyComponent = <template>
  <ShwTextH2>Size</ShwTextH2>

  {{#each CDS_ACCORDION_SIZE_OPTIONS as |size|}}
    <ShwTextH3>{{capitalize size}}</ShwTextH3>

    <ShwGrid @columns={{1}} @gap="2rem" as |SG|>
      <SG.Item @label="Size: {{size}}">
        <CodeFragmentBasicExample @size={{size}} />
      </SG.Item>
    </ShwGrid>
  {{/each}}

  <ShwDivider />

  <ShwTextH2>Alignment</ShwTextH2>

  {{#each CDS_ACCORDION_ALIGNMENT_OPTIONS as |align|}}
    <ShwTextH3>{{capitalize align}}</ShwTextH3>

    <ShwGrid @columns={{1}} @gap="2rem" as |SG|>
      <SG.Item @label="Alignment: {{align}}">
        <CodeFragmentBasicExample @align={{align}} />
      </SG.Item>
    </ShwGrid>
  {{/each}}

  <ShwDivider />
</template>;

export default SubSectionVariants;
