/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';
import style from 'ember-style-modifier';

import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwFlex from 'showcase/components/shw/flex';
import ShwOutliner from 'showcase/components/shw/outliner';

import { HdsCopySnippet } from '@hashicorp/design-system-components/components';

const SubSectionContent: TemplateOnlyComponent = <template>
  <ShwTextH2>Content</ShwTextH2>

  <ShwFlex as |SF|>
    <SF.Item @label="With short text">
      <HdsCopySnippet @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r" />
    </SF.Item>
    <SF.Item @label="With long text (multi-line / default)">
      <ShwOutliner {{style width="300px"}}>
        <HdsCopySnippet
          @textToCopy="With some really long text that should wrap and be multi-line"
        />
      </ShwOutliner>
    </SF.Item>
    <SF.Item @label="With long text (truncated)">
      <ShwOutliner {{style width="300px"}}>
        <HdsCopySnippet
          @textToCopy="With some really long text that should be truncated because isTruncated is set to true"
          @isTruncated={{true}}
        />
      </ShwOutliner>
    </SF.Item>
    <SF.Item @label="With an empty string to copy">
      <HdsCopySnippet @textToCopy="" />
    </SF.Item>
  </ShwFlex>

  <ShwFlex as |SF|>
    <SF.Item @label="With number to copy">
      {{! context: https://github.com/hashicorp/design-system/pull/1564 }}
      <HdsCopySnippet @textToCopy={{123456789}} />
    </SF.Item>
    <SF.Item @label="With the number '0' to copy">
      <HdsCopySnippet @textToCopy={{0}} />
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionContent;
