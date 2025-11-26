/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Component from '@glimmer/component';
import { CodeBlock } from 'ember-shiki';

import { HdsTabs } from '@hashicorp/design-system-components/components';

import DocCopyButton from 'website/components/doc/copy-button';
import DocCodePreview from 'website/components/doc/code-preview';

interface DocCodeGroupSignature {
  Args: {
    filename?: string;
    hbsSnippet: string;
    gtsSnippet: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

// Helper to undo code escaping for display
const unescapeCode = (code: string) => {
  return code.replace(/\\n/g, '\n');
};

export default class DocCodeGroup extends Component<DocCodeGroupSignature> {
  get unescapedHbsSnippet() {
    return unescapeCode(this.args.hbsSnippet);
  }

  get unescapedGtsSnippet() {
    return unescapeCode(this.args.gtsSnippet);
  }

  <template>
    <div>
      <div class="doc-code-block__code-rendered">
        <DocCodePreview @templateString={{this.unescapedHbsSnippet}} />
      </div>

      <HdsTabs as |T|>
        <T.Tab>.hbs</T.Tab>
        <T.Tab>.gts</T.Tab>

        <T.Panel>
          <div>
            <DocCopyButton
              @type="solid"
              @textToCopy={{this.unescapedHbsSnippet}}
            />
          </div>
          <CodeBlock
            @code={{this.unescapedHbsSnippet}}
            @language="hbs"
            @theme="github-dark"
            @showCopyButton={{false}}
          />
        </T.Panel>
        <T.Panel>
          <div>
            <DocCopyButton
              @type="solid"
              @textToCopy={{this.unescapedGtsSnippet}}
            />
          </div>
          <CodeBlock
            @code={{this.unescapedGtsSnippet}}
            @language="gts"
            @theme="github-dark"
            @showCopyButton={{false}}
          />
        </T.Panel>
      </HdsTabs>
    </div>
  </template>
}
