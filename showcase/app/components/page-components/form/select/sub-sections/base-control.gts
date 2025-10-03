/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { and, eq } from 'ember-truth-helpers';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import { HdsFormSelectBase } from '@hashicorp/design-system-components/components';

const TYPES = ['single', 'multiple'];
const VARIANTS = ['base', 'invalid', 'disabled'];
const STATES = ['default', 'hover', 'focus'];
const DISPLAYS = ['block', 'flex', 'grid'];

const SubSectionBaseControl: TemplateOnlyComponent = <template>
  <ShwTextH2>"Base" control</ShwTextH2>

  <ShwTextH3>Interaction status</ShwTextH3>

  <ShwFlex @gap="2rem" as |SF|>
    <SF.Item @label="Default">
      <HdsFormSelectBase aria-label="default" as |C|>
        <C.Options>
          <option></option>
          <option>Lorem ipsum dolor</option>
          <option>Sine qua non est</option>
        </C.Options>
      </HdsFormSelectBase>
    </SF.Item>
    <SF.Item @label="Selected">
      <HdsFormSelectBase aria-label="default selected" as |C|>
        <C.Options>
          <option></option>
          <option selected>Lorem ipsum dolor</option>
          <option>Sine qua non est</option>
        </C.Options>
      </HdsFormSelectBase>
    </SF.Item>
    <SF.Item @label="Multiple">
      <HdsFormSelectBase aria-label="multiple selected" multiple as |C|>
        <C.Options>
          <option selected>Lorem ipsum dolor</option>
          <option>Sine qua non est</option>
        </C.Options>
      </HdsFormSelectBase>
    </SF.Item>
    <SF.Item @label="Multiple / With groups">
      <HdsFormSelectBase
        aria-label="multiple groups selected"
        multiple
        size="8"
        as |C|
      >
        <C.Options>
          <optgroup label="Most common">
            <option value="Kubernetes">Kubernetes</option>
            <option value="AWS">AWS</option>
            <option value="Azure" disabled>Azure</option>
          </optgroup>
          <optgroup label="Others">
            <option value="Alibaba" selected>Alibaba</option>
            <option value="CloudWise" selected>CloudWise</option>
            <option value="SWA">SWA</option>
            <option value="Other">Other</option>
          </optgroup>
        </C.Options>
      </HdsFormSelectBase>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>States</ShwTextH3>

  {{#each TYPES as |type|}}
    <ShwTextH4>{{capitalize type}}</ShwTextH4>
    <ShwFlex @gap="2rem" as |SF|>
      {{#each STATES as |state|}}
        <SF.Item>
          <ShwFlex @direction="column" as |SF|>
            {{#each VARIANTS as |variant|}}
              {{#let
                (and (eq variant "disabled") (eq state "focus"))
                as |dontDisplay|
              }}
                {{#unless dontDisplay}}
                  <SF.Item
                    @label="{{capitalize variant}} / {{capitalize state}}"
                    mock-state-value={{state}}
                    mock-state-selector="select"
                  >
                    <HdsFormSelectBase
                      aria-label="{{state}}"
                      disabled={{if (eq variant "disabled") "disabled"}}
                      @isInvalid={{if (eq variant "invalid") true}}
                      multiple={{if (eq type "multiple") true null}}
                      as |F|
                    >
                      <F.Options>
                        <option selected>Lorem ipsum dolor</option>
                        <option>Sine qua non est</option>
                      </F.Options>
                    </HdsFormSelectBase>
                  </SF.Item>
                {{/unless}}
              {{/let}}
            {{/each}}
          </ShwFlex>
        </SF.Item>
      {{/each}}
    </ShwFlex>
  {{/each}}

  <ShwDivider @level={{2}} />

  <ShwTextH3>Custom layout</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item>
      <div class="shw-component-form-select-base-custom-layout">
        <label for="my-custom-select-example">Custom label</label>
        <HdsFormSelectBase id="my-custom-select-example" as |C|>
          <C.Options>
            <option>Lorem ipsum dolor</option>
            <option>Sine qua non est</option>
          </C.Options>
        </HdsFormSelectBase>
        <button type="button">Apply</button>
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Containers</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    {{#each DISPLAYS as |display|}}
      <SG.Item as |SGI|>
        <SGI.Label>Parent with <code>display: {{display}}</code></SGI.Label>
        <ShwFlex as |SF|>
          <SF.Item {{style display=display}}>
            <HdsFormSelectBase aria-label="{{display}} select example" as |C|>
              <C.Options>
                <option>Default width</option>
                <option>Lorem ipsum dolor</option>
                <option>Sine qua non est</option>
              </C.Options>
            </HdsFormSelectBase>
          </SF.Item>
          <SF.Item {{style display=display}}>
            <HdsFormSelectBase
              @width="248px"
              aria-label="select examples with custom widths"
              as |C|
            >
              <C.Options>
                <option>Custom width</option>
                <option>Lorem ipsum dolor</option>
                <option>Sine qua non est</option>
              </C.Options>
            </HdsFormSelectBase>
          </SF.Item>
        </ShwFlex>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider />
</template>;

export default SubSectionBaseControl;
