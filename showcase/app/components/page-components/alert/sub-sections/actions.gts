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
import ShwDivider from 'showcase/components/shw/divider';

import { HdsAlert } from '@hashicorp/design-system-components/components';
import { TYPES } from '@hashicorp/design-system-components/components/hds/alert/index';

const SubSectionActions: TemplateOnlyComponent = <template>
  <ShwTextH2>Actions</ShwTextH2>

  {{#each TYPES as |type|}}
    {{#if (notEq type "compact")}}
      <ShwTextH3>{{capitalize type}}</ShwTextH3>

      <ShwGrid @columns={{if (eq type "page") 1 2}} as |SG|>
        <SG.Item>
          <HdsAlert @type={{type}} @color="warning" as |A|>
            <A.Title>Action passed as yielded component</A.Title>
            <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</A.Description>
            <A.Button @text="Action" @color="secondary" />
          </HdsAlert>
        </SG.Item>

        <SG.Item>
          <HdsAlert @type={{type}} @color="warning" as |A|>
            <A.Title>With multiple actions passed as yielded components</A.Title>
            <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
              elit.</A.Description>
            <A.Button @text="Secondary" @color="secondary" />
            <A.Button @icon="plus" @text="Tertiary" @color="tertiary" />
            <A.LinkStandalone
              @icon="plus"
              @text="Standalone"
              @href="#"
              @color="secondary"
            />
          </HdsAlert>
        </SG.Item>

        <SG.Item>
          <HdsAlert @type={{type}} @color="warning" as |A|>
            <A.Title>With actions and custom content</A.Title>
            <A.Description>Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua.</A.Description>
            <A.GenericContent>
              <div class="shw-component-alert-sample-custom-content">This, for
                example, could be extra text above the actions.</div>
            </A.GenericContent>
            <A.Button @text="Action" @color="secondary" />
            <A.LinkStandalone
              @icon="plus"
              @text="Action"
              @href="#"
              @color="secondary"
            />
            <A.GenericFooter>
              <div class="shw-component-alert-sample-custom-content">This, for
                example, could be extra text below the actions.</div>
            </A.GenericFooter>
          </HdsAlert>
        </SG.Item>
      </ShwGrid>
    {{/if}}
  {{/each}}

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionActions;
