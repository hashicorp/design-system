/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';

import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsCdsTextInput } from '@hashicorp/design-system-components/components';

const CDS_TEXT_INPUT_SIZE_OPTIONS = ['sm', 'md', 'lg', 'xl'] as const;
const CDS_TEXT_INPUT_TYPE_OPTIONS = [
  'email',
  'password',
  'tel',
  'text',
  'url',
] as const;

const SubSectionVariants: TemplateOnlyComponent = <template>
  <ShwTextH2>Size</ShwTextH2>

  <ShwGrid @columns={{4}} as |SG|>
    {{#each CDS_TEXT_INPUT_SIZE_OPTIONS as |size|}}
      <SG.Item @label={{capitalize size}}>
        <HdsCdsTextInput
          @label="Workspace"
          @name="workspace"
          @size={{size}}
          @value="platform"
        />
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwTextH2>Type</ShwTextH2>

  <ShwGrid @columns={{3}} as |SG|>
    {{#each CDS_TEXT_INPUT_TYPE_OPTIONS as |type|}}
      <SG.Item @label={{capitalize type}}>
        <HdsCdsTextInput
          @label={{capitalize type}}
          @name="typed-input"
          @type={{type}}
          @value="example-value"
        />
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwTextH2>States</ShwTextH2>

  <ShwGrid @columns={{3}} as |SG|>
    <SG.Item @label="Required">
      <HdsCdsTextInput
        @label="Workspace ID"
        @name="required-example"
        @required={{true}}
      />
    </SG.Item>

    <SG.Item @label="Readonly">
      <HdsCdsTextInput
        @label="Organization"
        @name="readonly-example"
        @readonly={{true}}
        @value="hashicorp"
      />
    </SG.Item>

    <SG.Item @label="Disabled">
      <HdsCdsTextInput
        @disabled={{true}}
        @label="Team"
        @name="disabled-example"
        @value="platform"
      />
    </SG.Item>
  </ShwGrid>
</template>;

export default SubSectionVariants;
