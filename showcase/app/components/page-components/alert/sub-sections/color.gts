/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { capitalize } from '@ember/string';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwGrid from 'showcase/components/shw/grid';

import { HdsAlert } from '@hashicorp/design-system-components/components';
import {
  TYPES,
  COLORS,
} from '@hashicorp/design-system-components/components/hds/alert/index';

const SubSectionColor: TemplateOnlyComponent = <template>
  <ShwTextH2>Color</ShwTextH2>

  <ShwGrid @columns={{3}} as |SG|>
    {{#each COLORS as |color|}}
      {{#each TYPES as |type|}}
        <SG.Item @label="{{capitalize color}} / {{capitalize type}}">
          <HdsAlert @type={{type}} @color={{color}} as |A|>
            <A.Title>Lorem ipsum dolor</A.Title>
            <A.Description>This is the
              <em>{{type}}</em>
              alert with
              <em>{{color}}</em>
              color.</A.Description>
          </HdsAlert>
        </SG.Item>
      {{/each}}
    {{/each}}
  </ShwGrid>
</template>;

export default SubSectionColor;
