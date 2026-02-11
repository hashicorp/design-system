/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsDialogPrimitiveWrapperSignature {
  Blocks: {
    header?: [];
    body?: [];
    footer?: [];
  };
  Element: HTMLDialogElement;
}

const HdsDialogPrimitiveWrapper: TemplateOnlyComponent<HdsDialogPrimitiveWrapperSignature> =
  <template>
    <dialog class="hds-dialog-primitive__wrapper" ...attributes>
      <div class="hds-dialog-primitive__wrapper-header">
        {{yield to="header"}}
      </div>
      <div class="hds-dialog-primitive__wrapper-body">
        {{yield to="body"}}
      </div>
      <div class="hds-dialog-primitive__wrapper-footer">
        {{yield to="footer"}}
      </div>
    </dialog>
  </template>;

export default HdsDialogPrimitiveWrapper;
