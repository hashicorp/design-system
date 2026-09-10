/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwFlex from 'showcase/components/shw/flex';
import ShwOutliner from 'showcase/components/shw/outliner';
import ShwTextH2 from 'showcase/components/shw/text/h2';

import { HdsCopyButton } from '@hashicorp/design-system-components/components';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item @label="With text">
      <HdsCopyButton
        @text="Copy token"
        @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r"
      />
    </SF.Item>
    <SF.Item @label="Icon only">
      <HdsCopyButton
        @text="Copy token"
        @isIconOnly={{true}}
        @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r"
      />
    </SF.Item>
    <SF.Item @label="Full width">
      <ShwOutliner {{style width="300px"}}>
        <HdsCopyButton
          @text="Copy token"
          @isFullWidth={{true}}
          @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r"
        />
      </ShwOutliner>
    </SF.Item>
    <SF.Item @label="Full width + icon only">
      <ShwOutliner {{style width="300px"}}>
        <HdsCopyButton
          @text="Copy token"
          @isIconOnly={{true}}
          @isFullWidth={{true}}
          @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r"
        />
      </ShwOutliner>
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionContent;
