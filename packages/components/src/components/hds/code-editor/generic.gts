/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsCodeEditorGenericSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsCodeEditorGeneric: TOC<HdsCodeEditorGenericSignature> = <template>
  <div class="hds-code-editor__header-generic" ...attributes>
    {{yield}}
  </div>
</template>;

export default HdsCodeEditorGeneric;
