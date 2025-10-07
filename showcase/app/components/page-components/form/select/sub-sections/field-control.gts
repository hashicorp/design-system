/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { eq } from 'ember-truth-helpers';
import style from 'ember-style-modifier';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';
import ShwTextH4 from 'showcase/components/shw/text/h4';

import {
  HdsFormSelectField,
  HdsLinkInline,
} from '@hashicorp/design-system-components/components';

const TYPES = ['single', 'multiple'];
const DISPLAYS = ['block', 'flex', 'grid'];

const SubSectionFieldControl: TemplateOnlyComponent = <template>
  <ShwTextH2>"Field" control</ShwTextH2>

  <ShwTextH3>Content</ShwTextH3>

  {{#each TYPES as |type|}}
    <ShwTextH4>{{capitalize type}}</ShwTextH4>
    <ShwGrid @columns={{3}} as |SG|>
      <SG.Item @label="Only label">
        <HdsFormSelectField
          multiple={{if (eq type "multiple") true null}}
          as |F|
        >
          <F.Label>Lorem ipsum dolor</F.Label>
          <F.Options>
            <option selected>Lorem ipsum dolor</option>
            <option>Sine qua non est</option>
          </F.Options>
        </HdsFormSelectField>
      </SG.Item>
      <SG.Item @label="Label + Helper text">
        <HdsFormSelectField
          multiple={{if (eq type "multiple") true null}}
          as |F|
        >
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Options>
            <option selected>Lorem ipsum dolor</option>
            <option>Sine qua non est</option>
          </F.Options>
        </HdsFormSelectField>
      </SG.Item>
      <SG.Item @label="Label + Helper text with link">
        <HdsFormSelectField
          multiple={{if (eq type "multiple") true null}}
          as |F|
        >
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text
            <HdsLinkInline @route="index">with a link</HdsLinkInline></F.HelperText>
          <F.Options>
            <option selected>Lorem ipsum dolor</option>
            <option>Sine qua non est</option>
          </F.Options>
        </HdsFormSelectField>
      </SG.Item>
      <SG.Item @label="Label + Error">
        <HdsFormSelectField
          multiple={{if (eq type "multiple") true null}}
          @isInvalid={{true}}
          as |F|
        >
          <F.Label>This is the label</F.Label>
          <F.Options>
            <option selected>Lorem ipsum dolor</option>
            <option>Sine qua non est</option>
          </F.Options>
          <F.Error>This is the error</F.Error>
        </HdsFormSelectField>
      </SG.Item>
      <SG.Item @label="Label + Helper text + Error">
        <HdsFormSelectField
          multiple={{if (eq type "multiple") true null}}
          @isInvalid={{true}}
          as |F|
        >
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Options>
            <option selected>Lorem ipsum dolor</option>
            <option>Sine qua non est</option>
          </F.Options>
          <F.Error>This is the error</F.Error>
        </HdsFormSelectField>
      </SG.Item>
      <SG.Item @label="Label + Helper text + Errors">
        <HdsFormSelectField
          multiple={{if (eq type "multiple") true null}}
          @isInvalid={{true}}
          as |F|
        >
          <F.Label>This is the label</F.Label>
          <F.HelperText>This is the helper text</F.HelperText>
          <F.Options>
            <option selected>Lorem ipsum dolor</option>
            <option>Sine qua non est</option>
          </F.Options>
          <F.Error as |E|>
            <E.Message>First error message</E.Message>
            <E.Message>Second error message</E.Message>
          </F.Error>
        </HdsFormSelectField>
      </SG.Item>
    </ShwGrid>
  {{/each}}

  <ShwDivider @level={{2}} />

  <ShwTextH3>Required and optional</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="With legend + Required">
      <HdsFormSelectField @isRequired={{true}} as |F|>
        <F.Label>Lorem ipsum dolor</F.Label>
        <F.Options>
          <option>Lorem ipsum dolor</option>
          <option>Sine qua non est</option>
        </F.Options>
      </HdsFormSelectField>
    </SG.Item>
    <SG.Item @label="With legend + Optional">
      <HdsFormSelectField @isOptional={{true}} as |F|>
        <F.Label>Lorem ipsum dolor</F.Label>
        <F.Options>
          <option>Lorem ipsum dolor</option>
          <option>Sine qua non est</option>
        </F.Options>
      </HdsFormSelectField>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>States</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Disabled">
      <HdsFormSelectField disabled={{true}} as |F|>
        <F.Label>Lorem ipsum dolor</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Options>
          <option>Lorem ipsum dolor</option>
          <option>Sine qua non est</option>
        </F.Options>
      </HdsFormSelectField>
    </SG.Item>
    <SG.Item @label="Disabled / Multiple">
      <HdsFormSelectField
        disabled={{true}}
        aria-label="multiple groups selected"
        multiple
        size="8"
        as |F|
      >
        <F.Label>Lorem ipsum dolor</F.Label>
        <F.HelperText>This is the helper text</F.HelperText>
        <F.Options>
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
        </F.Options>
      </HdsFormSelectField>
    </SG.Item>
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH3>Containers</ShwTextH3>

  <ShwGrid @columns={{3}} as |SG|>
    {{#each DISPLAYS as |display|}}
      <SG.Item as |SGI|>
        <SGI.Label>Parent with <code>display: {{display}}</code></SGI.Label>
        <div {{style display=display}}>
          <HdsFormSelectField @isInvalid={{true}} as |F|>
            <F.Label>This is the label</F.Label>
            <F.HelperText>This is the helper text</F.HelperText>
            <F.Options>
              <option>Lorem ipsum dolor</option>
              <option>Sine qua non est</option>
            </F.Options>
            <F.Error>This is the error</F.Error>
          </HdsFormSelectField>
        </div>
      </SG.Item>
    {{/each}}
  </ShwGrid>
</template>;

export default SubSectionFieldControl;
