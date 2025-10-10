/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import { array } from '@ember/helper';

import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsCodeBlockCopyButton } from '@hashicorp/design-system-components/components';

const STATES = ['default', 'hover', 'active', 'focus'];

const SubSectionBaseElements: TemplateOnlyComponent = <template>
  <ShwTextH2>CodeBlockCopyButton</ShwTextH2>

  <ShwTextH3>States</ShwTextH3>

  <span class="shw-component-code-block-display-none" id="test-target">Copy me</span>

  <ShwGrid @columns={{6}} as |SG|>
    {{#each STATES as |state|}}
      <SG.Item
        @label={{capitalize state}}
        class="shw-component-code-block-copy-button"
      >
        <HdsCodeBlockCopyButton
          mock-state-value={{state}}
          @targetToCopy="#test-target"
          class="hds-code-block--theme-dark"
        />
      </SG.Item>
    {{/each}}
    {{#let (array "success" "error") as |statuses|}}
      {{#each statuses as |status|}}
        <SG.Item
          @label={{capitalize status}}
          class="shw-component-code-block-copy-button"
        >
          <HdsCodeBlockCopyButton
            mock-copy-status={{status}}
            @targetToCopy="#test-target"
            class="hds-code-block--theme-dark"
          />
        </SG.Item>
      {{/each}}
    {{/let}}
  </ShwGrid>
</template>;

export default SubSectionBaseElements;
