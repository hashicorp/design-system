/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

export interface HdsApplicationStateMediaSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsApplicationStateMedia: TemplateOnlyComponent<HdsApplicationStateMediaSignature> =
  <template>
    <div class="hds-application-state__media" ...attributes>
      {{yield}}
    </div>
  </template>;

export default HdsApplicationStateMedia;
