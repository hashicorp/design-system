/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsCodeEditorGenericSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsCodeEditorGeneric: TemplateOnlyComponent<HdsCodeEditorGenericSignature> =
  <template>
    <div class="hds-code-editor__header-generic" ...attributes>
      {{yield}}
    </div>
  </template>;

export default HdsCodeEditorGeneric;
