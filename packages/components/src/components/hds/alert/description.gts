/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsAlertDescriptionSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsAlertDescription: TemplateOnlyComponent<HdsAlertDescriptionSignature> =
  <template>
    <div
      class="hds-alert__description hds-font-weight-regular hds-foreground-primary"
      ...attributes
    >{{yield}}</div>
  </template>;

export default HdsAlertDescription;
