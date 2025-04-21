/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { hash } from '@ember/helper';

import HdsAlert from '../alert/index.gts';

import type { TOC } from '@ember/component/template-only';
import type { HdsAlertSignature } from '../alert/index.gts';

export interface HdsToastSignature extends Omit<HdsAlertSignature, 'Args'> {
  Args: Omit<HdsAlertSignature['Args'], 'type'>;
}

const HdsToast: TOC<HdsToastSignature> = <template>
  <HdsAlert
    class="hds-toast"
    @type="inline"
    @color={{@color}}
    @icon={{@icon}}
    @onDismiss={{@onDismiss}}
    role="alert"
    aria-live="polite"
    ...attributes
    as |A|
  >
    {{yield
      (hash
        Title=A.Title
        Description=A.Description
        Button=A.Button
        LinkStandalone=A.LinkStandalone
        Generic=A.Generic
      )
    }}
  </HdsAlert>
</template>;

export default HdsToast;
