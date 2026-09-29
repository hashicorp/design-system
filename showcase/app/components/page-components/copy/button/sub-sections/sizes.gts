/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { capitalize } from '@ember/string';
import style from 'ember-style-modifier';

import ShwFlex from 'showcase/components/shw/flex';
import ShwOutliner from 'showcase/components/shw/outliner';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsCopyButton } from '@hashicorp/design-system-components/components';
import { SIZES } from '@hashicorp/design-system-components/components/hds/copy/button/index';

const SubSectionSizes: TemplateOnlyComponent = <template>
  <ShwTextH2>Sizes</ShwTextH2>

  <ShwFlex as |SF|>
    {{#each SIZES as |size|}}
      <SF.Item @label={{capitalize size}}>
        <HdsCopyButton
          @text="Copy token"
          @size={{size}}
          @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r"
        />
        <br />
        <HdsCopyButton
          @text="Copy token"
          @isIconOnly={{true}}
          @size={{size}}
          @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r"
        />
      </SF.Item>
    {{/each}}
    <SF.Item @label="Full width">
      <ShwOutliner {{style width="300px"}}>
        <HdsCopyButton
          @text="Copy token"
          @isFullWidth={{true}}
          @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r"
        />
      </ShwOutliner>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionSizes;
