/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { array } from '@ember/helper';

import ShwDivider from 'showcase/components/shw/divider';
import ShwGrid from 'showcase/components/shw/grid';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import CodeFragmentWithLoremIpsum from 'showcase/components/page-components/dropdown/code-fragments/with-lorem-ipsum';

const SubSectionWidth: TemplateOnlyComponent = <template>
  <ShwTextH2>Width</ShwTextH2>

  <ShwGrid @columns={{4}} @gap="2rem" as |SG|>
    {{#let (array false true) as |options|}}
      {{#each options as |option|}}
        <SG.Item @label="matchToggleWidth={{option}}" as |SGI|>
          <SGI.Label><code>ToggleButton</code> auto</SGI.Label>
          <div class="shw-component-dropdown-fixed-height-container">
            <CodeFragmentWithLoremIpsum @matchToggleWidth={{option}} />
          </div>
        </SG.Item>
        <SG.Item @label="matchToggleWidth={{option}}" as |SGI|>
          <SGI.Label><code>ToggleButton</code> 100%</SGI.Label>
          <div class="shw-component-dropdown-fixed-height-container">
            <CodeFragmentWithLoremIpsum
              @matchToggleWidth={{option}}
              @toggleButtonWidth="100%"
            />
          </div>
        </SG.Item>
        <SG.Item @label="matchToggleWidth={{option}}" as |SGI|>
          <SGI.Label><code>ToggleButton</code>
            auto +
            <code>@width="200px"</code></SGI.Label>
          <div class="shw-component-dropdown-fixed-height-container">
            <CodeFragmentWithLoremIpsum
              @matchToggleWidth={{option}}
              @width="200px"
            />
          </div>
        </SG.Item>
        <SG.Item @label="matchToggleWidth={{option}}" as |SGI|>
          <SGI.Label><code>ToggleButton</code>
            auto +
            <code>@width="100%"</code></SGI.Label>
          <div class="shw-component-dropdown-fixed-height-container">
            <CodeFragmentWithLoremIpsum
              @width="100%"
              @matchToggleWidth={{option}}
            />
          </div>
        </SG.Item>
      {{/each}}
    {{/let}}
  </ShwGrid>

  <ShwDivider @level={{2}} />
</template>;

export default SubSectionWidth;
