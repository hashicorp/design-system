/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { eq, notEq } from 'ember-truth-helpers';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwGrid from 'showcase/components/shw/grid';

import { HdsAlert } from '@hashicorp/design-system-components/components';
import NOOP from 'showcase/utils/noop';
import { TYPES } from '@hashicorp/design-system-components/components/hds/alert/index';

const SubSectionDismiss: TemplateOnlyComponent = <template>
  <ShwTextH2>Dismiss</ShwTextH2>

  {{#each TYPES as |type|}}
    {{#if (notEq type "compact")}}
      <ShwTextH3>{{capitalize type}}</ShwTextH3>

      <ShwGrid @columns={{if (eq type "page") 1 2}} as |SG|>
        <SG.Item>
          <HdsAlert @type={{type}} @color="neutral" as |A|>
            <A.Title>Without the dismiss button (default)</A.Title>
            <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</A.Description>
          </HdsAlert>
        </SG.Item>

        <SG.Item>
          <HdsAlert @type={{type}} @color="neutral" @onDismiss={{NOOP}} as |A|>
            <A.Title>With the dismiss button</A.Title>
            <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</A.Description>
          </HdsAlert>
        </SG.Item>

        <SG.Item>
          <HdsAlert
            @type={{type}}
            @color="neutral"
            @icon={{false}}
            @onDismiss={{NOOP}}
            as |A|
          >
            <A.Title>With the dismiss button and no icon</A.Title>
            <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</A.Description>
          </HdsAlert>
        </SG.Item>

        <SG.Item>
          <HdsAlert @type={{type}} @color="neutral" @onDismiss={{NOOP}} as |A|>
            <A.Description>With the dismiss button and no title</A.Description>
          </HdsAlert>
        </SG.Item>
      </ShwGrid>
    {{/if}}
  {{/each}}
</template>;

export default SubSectionDismiss;
