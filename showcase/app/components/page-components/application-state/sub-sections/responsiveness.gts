/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { array, hash } from '@ember/helper';
import style from 'ember-style-modifier/modifiers/style';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwOutliner from 'showcase/components/shw/outliner';
import { ALIGNS } from '@hashicorp/design-system-components/components/hds/application-state/index';

import { HdsApplicationState } from '@hashicorp/design-system-components/components';

import type { TemplateOnlyComponent } from '@ember/component/template-only';

const SubSectionResponsiveness: TemplateOnlyComponent = <template>
  <ShwTextH2>Responsiveness</ShwTextH2>

  {{!-- TODO - make this per subsection
  
  <button type="button" class="shw-component-application-state-button-highlight" {{on "click" this.toggleHighlight}}>
    {{if this.showHighlight "Hide" "Show"}}
    layout highlight
  </button>
  
  --}}

  <ShwFlex @direction="column" @gap="4rem" as |SF|>
    {{#let
      (array
        (hash
          value="100%"
          label="Both media and content smaller than parent container"
        )
        (hash
          value="550px"
          label="Media larger and content smaller than parent container"
        )
        (hash
          value="320px"
          label="Both media and content larger than parent container"
        )
      )
      as |widths|
    }}
      {{#each widths as |width|}}
        {{#each ALIGNS as |align|}}
          <SF.Item @label="{{width.label}} / {{align}} aligned">
            <ShwOutliner {{style width=width.value}}>
              <HdsApplicationState @align={{align}} as |A|>
                <A.Media>
                  <img
                    src="/assets/images/cat-banner.png"
                    alt="3 cats wearing old-fashioned formal wear"
                    class="shw-component-application-state-banner"
                  />
                </A.Media>
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
            </ShwOutliner>
          </SF.Item>
        {{/each}}
      {{/each}}
    {{/let}}
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionResponsiveness;
