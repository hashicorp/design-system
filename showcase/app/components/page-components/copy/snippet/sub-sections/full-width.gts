/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwOutliner from 'showcase/components/shw/outliner';
import ShwDivider from 'showcase/components/shw/divider';

import { HdsCopySnippet } from '@hashicorp/design-system-components/components';

const SubSectionFullWidth: TemplateOnlyComponent = <template>
  <ShwTextH2>Full width</ShwTextH2>
  <ShwFlex as |SF|>
    <SF.Item @label="With short text">
      <ShwOutliner {{style width="500px"}}>
        <HdsCopySnippet
          @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r"
          @isFullWidth={{true}}
        />
      </ShwOutliner>
    </SF.Item>
    <SF.Item @label="With long text">
      <ShwOutliner {{style width="500px"}}>
        <HdsCopySnippet
          @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r and some other text that should not matter because the element with is set to full width and hopefully people will not do this but in case they do we want to make sure that we still have the designed layout"
          @isFullWidth={{true}}
        />
      </ShwOutliner>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionFullWidth;
