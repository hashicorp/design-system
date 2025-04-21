/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';

export interface HdsApplicationStateMediaSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

const HdsApplicationStateMedia: TOC<HdsApplicationStateMediaSignature> =
  <template>
    <div class="hds-application-state__media" ...attributes>
      {{yield}}
    </div>
  </template>;

export default HdsApplicationStateMedia;
