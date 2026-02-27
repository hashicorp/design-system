/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { hash } from '@ember/helper';

import HdsButton from '../button/index.gts';
import HdsDropdown from '../dropdown/index.ts';
import HdsFormSelectBase from '../form/select/base.gts';
import HdsFormTextInputBase from '../form/text-input/base.gts';
import HdsYield from '../yield/index.gts';

export interface HdsSegmentedGroupSignature {
  Blocks: {
    default: [
      {
        Button?: typeof HdsButton;
        Dropdown?: typeof HdsDropdown;
        Select?: typeof HdsFormSelectBase;
        TextInput?: typeof HdsFormTextInputBase;
        Generic?: typeof HdsYield;
      },
    ];
  };
  Element: HTMLDivElement;
}

const HdsSegmentedGroup: TemplateOnlyComponent<HdsSegmentedGroupSignature> =
  <template>
    <div class="hds-segmented-group" ...attributes>
      {{yield
        (hash
          Button=HdsButton
          Dropdown=HdsDropdown
          Select=HdsFormSelectBase
          TextInput=HdsFormTextInputBase
          Generic=HdsYield
        )
      }}
    </div>
  </template>;

export default HdsSegmentedGroup;
