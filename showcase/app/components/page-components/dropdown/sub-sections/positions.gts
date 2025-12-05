/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwOutliner from 'showcase/components/shw/outliner';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsDropdown } from '@hashicorp/design-system-components/components';
import { POSITIONS } from '@hashicorp/design-system-components/components/hds/dropdown/index';

const SubSectionPositions: TemplateOnlyComponent = <template>
  <ShwTextH2>Position</ShwTextH2>

  <ShwGrid @columns={{2}} as |SG|>
    {{#each POSITIONS as |position|}}
      <SG.Item @label={{capitalize position}}>
        <ShwOutliner {{style padding="6em 12em"}}>
          <HdsDropdown @isOpen={{true}} @listPosition={{position}} as |D|>
            <D.ToggleButton @color="secondary" @text="Menu" />
            <D.Interactive @href="#">Create</D.Interactive>
            <D.Interactive @href="#">Edit</D.Interactive>
          </HdsDropdown>
        </ShwOutliner>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionPositions;
