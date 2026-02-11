/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { hash } from '@ember/helper';

import HdsAlert from '../alert/index.gts';

import type { HdsAlertSignature } from '../alert/index.gts';

export interface HdsToastSignature extends Omit<HdsAlertSignature, 'Args'> {
  Args: Omit<HdsAlertSignature['Args'], 'type'>;
}

const HdsToast: TemplateOnlyComponent<HdsToastSignature> = <template>
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
