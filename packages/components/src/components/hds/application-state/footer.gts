/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { hash } from '@ember/helper';

import HdsButton from '../button/index.gts';
import HdsDropdown from '../dropdown/index.ts';
import HdsLinkStandalone from '../link/standalone.gts';

export interface HdsApplicationStateFooterSignature {
  Args: {
    hasDivider?: boolean;
  };
  Blocks: {
    default?: [
      {
        Button?: typeof HdsButton;
        Dropdown?: typeof HdsDropdown;
        LinkStandalone?: typeof HdsLinkStandalone;
      },
    ];
  };
  Element: HTMLDivElement;
}

const HdsApplicationStateFooter: TemplateOnlyComponent<HdsApplicationStateFooterSignature> =
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
