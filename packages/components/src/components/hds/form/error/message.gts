/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import HdsTextBody from '../../text/body.gts';

import type { TOC } from '@ember/component/template-only';
import type { HdsTextBodySignature } from '../../text/body.gts';

export interface HdsFormErrorMessageSignature {
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const HdsFormErrorMessage: TOC<HdsFormErrorMessageSignature> = <template>
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
