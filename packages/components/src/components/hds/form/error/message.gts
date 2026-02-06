/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import HdsTextBody from '../../text/body.gts';

import type { HdsTextBodySignature } from '../../text/body.gts';

export interface HdsFormErrorMessageSignature {
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const HdsFormErrorMessage: TemplateOnlyComponent<HdsFormErrorMessageSignature> =
  <template>
    <HdsTextBody
      class="hds-form-error__message"
      @tag="p"
      @size="100"
      @weight="medium"
      ...attributes
    >
      {{yield}}
    </HdsTextBody>
  </template>;

export default HdsFormErrorMessage;
