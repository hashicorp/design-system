/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
import type { HdsLinkStandaloneSignature } from '../link/standalone.gts';
import type { HdsButtonSignature } from '../button/index.gts';
import type { HdsDropdownSignature } from '../dropdown/index.gts';
import { hash } from '@ember/helper';
import HdsButton from '../button/index.gts';
import HdsDropdown from '../dropdown/index.gts';
import HdsLinkStandalone from '../link/standalone.gts';

export interface HdsApplicationStateFooterSignature {
  Args: {
    hasDivider?: boolean;
  };
  Blocks: {
    default?: [
      {
        Button?: ComponentLike<HdsButtonSignature>;
        Dropdown?: ComponentLike<HdsDropdownSignature>;
        LinkStandalone?: ComponentLike<HdsLinkStandaloneSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

const HdsApplicationStateFooter: TOC<HdsApplicationStateFooterSignature> =
  <template>
    <div class="hds-application-state__footer" ...attributes>
      {{yield
        (hash
          Button=HdsButton Dropdown=HdsDropdown LinkStandalone=HdsLinkStandalone
        )
      }}
    </div>
  </template>;

export default HdsApplicationStateFooter;
