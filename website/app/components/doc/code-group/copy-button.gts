/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import DocCopyButton from 'website/components/doc/copy-button';

interface DocCodeGroupCopyButtonSignature {
  Args: {
    textToCopy: string;
  };
  Element: HTMLButtonElement;
}

const DocCodeGroupCopyButton: TemplateOnlyComponent<DocCodeGroupCopyButtonSignature> =
  <template>
    <DocCopyButton
      @textToCopy={{@textToCopy}}
      @type="icon-only"
      class="doc-code-group__copy-button"
    />
  </template>;

export default DocCodeGroupCopyButton;
