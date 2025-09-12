/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import { ALIGNS } from '@hashicorp/design-system-components/components/hds/application-state/index';

import { HdsApplicationState } from '@hashicorp/design-system-components/components';

import type { TemplateOnlyComponent } from '@ember/component/template-only';

const SubSectionAlignment: TemplateOnlyComponent = <template>
  <ShwTextH2>Alignment</ShwTextH2>

  {{!-- TODO - make this per subsection
  
  <button type="button" class="shw-component-application-state-button-highlight" {{on "click" this.toggleHighlight}}>
    {{if this.showHighlight "Hide" "Show"}}
    layout highlight
  </button>
  
  --}}

  <ShwFlex @direction="row" @gap="4rem" as |SF|>
    {{#each ALIGNS as |align|}}
      <SF.Item
        @label="{{capitalize align}} aligned {{if
          (eq align 'left')
          ' (default)'
        }}"
      >
        <HdsApplicationState @align={{align}} as |A|>
          <A.Header
            @title="An error has occurred"
            @icon="alert-circle"
            @errorCode="404"
          />
          <A.Body
            @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
          />
          <A.Footer as |F|>
            <F.LinkStandalone @icon="arrow-left" @text="Go back" @href="/" />
          </A.Footer>
        </HdsApplicationState>
      </SF.Item>
    {{/each}}
    {{#each ALIGNS as |align|}}
      <SF.Item @label="Two actions / {{align}} aligned">
        <HdsApplicationState @align={{align}} as |A|>
          <A.Header
            @title="An error has occurred"
            @icon="alert-circle"
            @errorCode="404"
          />
          <A.Body
            @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
          />
          <A.Footer as |F|>
            <F.Button @color="primary" @text="Primary action" />
            <F.LinkStandalone
              @icon="docs-link"
              @text="Learn more"
              @iconPosition="trailing"
              @href="#"
            />
          </A.Footer>
        </HdsApplicationState>
      </SF.Item>
    {{/each}}
    {{#each ALIGNS as |align|}}
      <SF.Item @label="Three actions / {{align}} aligned">
        <HdsApplicationState @align={{align}} as |A|>
          <A.Header
            @title="An error has occurred"
            @icon="alert-circle"
            @errorCode="404"
          />
          <A.Body
            @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
          />
          <A.Footer as |F|>
            <F.Button @color="primary" @text="Primary action" />
            <F.Button @color="secondary" @text="Secondary action" />
            <F.LinkStandalone
              @icon="docs-link"
              @text="Learn more"
              @iconPosition="trailing"
              @href="#"
            />
          </A.Footer>
        </HdsApplicationState>
      </SF.Item>
    {{/each}}
    {{#each ALIGNS as |align|}}
      <SF.Item @label="Two actions (1 dropdown) / {{align}} aligned">
        <HdsApplicationState @align={{align}} as |A|>
          <A.Header
            @title="An error has occurred"
            @icon="alert-circle"
            @errorCode="404"
          />
          <A.Body
            @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
          />
          <A.Footer as |F|>
            <F.Button @color="primary" @text="Primary action" />
            <F.Dropdown @listPosition="bottom-right" as |dd|>
              <dd.ToggleButton @text="Choose an option" />
              <dd.Title @text="Categories" />
              <dd.Interactive @href="#">Documentation</dd.Interactive>
              <dd.Interactive @href="#">Tutorials</dd.Interactive>
              <dd.Interactive @href="#">Changelogs</dd.Interactive>
            </F.Dropdown>
          </A.Footer>
        </HdsApplicationState>
      </SF.Item>
    {{/each}}
    {{#each ALIGNS as |align|}}
      <SF.Item @label="Three actions (1 dropdown) / {{align}} aligned">
        <HdsApplicationState @align={{align}} as |A|>
          <A.Header
            @title="An error has occurred"
            @icon="alert-circle"
            @errorCode="404"
          />
          <A.Body
            @text="Sorry, an unexpected error has occurred. Please try again later or contact support for assistance."
          />
          <A.Footer as |F|>
            <F.Button @color="primary" @text="Primary action" />
            <F.Dropdown @listPosition="bottom-right" as |dd|>
              <dd.ToggleButton @text="Choose an option" />
              <dd.Title @text="Categories" />
              <dd.Interactive @href="#">Documentation</dd.Interactive>
              <dd.Interactive @href="#">Tutorials</dd.Interactive>
              <dd.Interactive @href="#">Changelogs</dd.Interactive>
            </F.Dropdown>
            <F.LinkStandalone
              @icon="docs-link"
              @text="Learn more"
              @iconPosition="trailing"
              @href="#"
            />
          </A.Footer>
        </HdsApplicationState>
      </SF.Item>
    {{/each}}
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionAlignment;
