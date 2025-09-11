/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import style from 'ember-style-modifier/modifiers/style';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH4 from 'showcase/components/shw/text/h4';
import ShwFlex from 'showcase/components/shw/flex';
import ShwGrid from 'showcase/components/shw/grid';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsIcon } from '@hashicorp/design-system-components/components';
import { COLORS } from '@hashicorp/design-system-components/components/hds/icon/index';

const SubSectionColor: TemplateOnlyComponent = <template>
  <ShwTextH2>Color</ShwTextH2>

  <ShwTextH4 @tag="h3">Color inheritance</ShwTextH4>
  <ShwFlex @direction="column" as |SF|>
    <SF.Item as |SFI|>
      <SFI.Label>unspecified color (<code>currentColor</code>)</SFI.Label>
      <div>
        <HdsIcon @name="lock-fill" @size="24" />
      </div>
    </SF.Item>
    <SF.Item as |SGI|>
      <SGI.Label>parent with <code>#e12568</code> color</SGI.Label>
      <div {{style color="#e12568"}}>
        <HdsIcon @name="lock-fill" @size="24" />
      </div>
    </SF.Item>
  </ShwFlex>

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">Pre-defined colors</ShwTextH4>
  <ShwGrid @columns={{5}} as |SG|>
    {{#each COLORS as |color|}}
      <SG.Item @label={{color}}>
        <div class="shw-component-icon-sample-color--{{color}}">
          <HdsIcon @name="lock-fill" @color={{color}} @size="24" />
        </div>
      </SG.Item>
    {{/each}}
  </ShwGrid>

  <ShwDivider @level={{2}} />

  <ShwTextH4 @tag="h3">Custom colors</ShwTextH4>
  <ShwFlex @direction="column" as |SF|>
    <SF.Item as |SGI|>
      <SGI.Label><code>#e91e63</code></SGI.Label>
      <HdsIcon @name="lock-fill" @color="#e91e63" @size="24" />
    </SF.Item>
    <SF.Item as |SGI|>
      <SGI.Label><code>--token-color-palette-purple-400</code></SGI.Label>
      <HdsIcon
        @name="lock-fill"
        @color="var(--token-color-palette-purple-400)"
        @size="24"
      />
    </SF.Item>
    <SF.Item as |SGI|>
      <SGI.Label><code>orange</code>
        + parent with
        <code>green !important</code>
      </SGI.Label>
      {{! template-lint-disable no-inline-styles }}
      <div style="color:green !important">
        <HdsIcon @name="lock-fill" @color="orange" @size="24" />
      </div>
      {{! template-lint-enable no-inline-styles }}
    </SF.Item>
  </ShwFlex>

  <ShwDivider />
</template>;

export default SubSectionColor;
