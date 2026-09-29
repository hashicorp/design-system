/**
 * Copyright IBM Corp. 2021, 2026
 * SPDX-License-Identifier: MPL-2.0
 */
import type { TemplateOnlyComponent } from '@ember/component/template-only';

import ShwFlex from 'showcase/components/shw/flex';
import ShwTextH2 from 'showcase/components/shw/text/h2';
import ShwTextH3 from 'showcase/components/shw/text/h3';

import { HdsCopyButton } from '@hashicorp/design-system-components/components';

const SubSectionDemos: TemplateOnlyComponent = <template>
  <ShwTextH2>Demos</ShwTextH2>

  <ShwTextH3>Copy from text (<code>@textToCopy</code>)</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="String value">
      <HdsCopyButton
        @text="Copy secret key"
        @textToCopy="fbrct1ed-fgr35h-tyng89-wed4r"
      />
    </SF.Item>
    <SF.Item @label="Number value">
      <HdsCopyButton @text="Copy ID" @textToCopy={{123456789}} />
    </SF.Item>
  </ShwFlex>

  <ShwTextH3>Copy from target (<code>@targetToCopy</code>)</ShwTextH3>

  <ShwFlex as |SF|>
    <SF.Item @label="Target: &lt;input&gt; (CSS selector string)">
      <input
        id="demo-copy-button-input-target"
        type="text"
        value="Content from input"
        readonly
      />
      <br />
      <HdsCopyButton
        @text="Copy input value"
        @targetToCopy="#demo-copy-button-input-target"
      />
    </SF.Item>
    <SF.Item @label="Target: &lt;textarea&gt; (CSS selector string)">
      <textarea id="demo-copy-button-textarea-target" rows="3" readonly>Content
        from textarea</textarea>
      <br />
      <HdsCopyButton
        @text="Copy textarea value"
        @targetToCopy="#demo-copy-button-textarea-target"
      />
    </SF.Item>
    <SF.Item @label="Target: &lt;div&gt; (CSS selector string)">
      <div id="demo-copy-button-div-target">
        Content from a div element
      </div>
      <HdsCopyButton
        @text="Copy div content"
        @targetToCopy="#demo-copy-button-div-target"
      />
    </SF.Item>
  </ShwFlex>
</template>;

export default SubSectionDemos;
