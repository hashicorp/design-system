/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsAlertDescriptionSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsAlertDescription: TOC<HdsAlertDescriptionSignature> = <template>
  <div
    class="hds-alert__description hds-font-weight-regular hds-foreground-primary"
    ...attributes
  >{{yield}}</div>
</template>;

export default HdsAlertDescription;
