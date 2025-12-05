/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import { capitalize } from '@ember/string';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextBody from 'showcase/components/shw/text/body';
import ShwFlex from 'showcase/components/shw/flex';

import { HdsAlert } from '@hashicorp/design-system-components/components';
import { TYPES } from '@hashicorp/design-system-components/components/hds/alert/index';

const SubSectionType: TemplateOnlyComponent = <template>
  <ShwTextH2>Type</ShwTextH2>

  {{#each TYPES as |type|}}
    <ShwTextBody>{{capitalize type}}</ShwTextBody>
    <ShwFlex as |SF|>
      <SF.Item @grow={{true}}>
        <HdsAlert @type={{type}} as |A|>
          <A.Title>Lorem ipsum</A.Title>
          <A.Description>Lorem ipsum dolor sit amet.</A.Description>
        </HdsAlert>
      </SF.Item>
    </ShwFlex>
  {{/each}}
</template>;

export default SubSectionType;
