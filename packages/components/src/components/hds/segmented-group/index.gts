/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { hash } from '@ember/helper';

import HdsButton from '../button/index.gts';
import HdsDropdown from '../dropdown/index.gts';
import HdsFormSelectBase from '../form/select/base.gts';
import HdsFormTextInputBase from '../form/text-input/base.gts';
import HdsYield from '../yield/index.gts';

import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
import type { HdsButtonSignature } from '../button/index.gts';
import type { HdsDropdownSignature } from '../dropdown/index.gts';
import type { HdsFormSelectBaseSignature } from '../form/select/base.gts';
import type { HdsFormTextInputBaseSignature } from '../form/text-input/base.gts';
import type { HdsYieldSignature } from '../yield/index.gts';

export interface HdsSegmentedGroupSignature {
  Blocks: {
    default: [
      {
        Button?: ComponentLike<HdsButtonSignature>;
        Dropdown?: ComponentLike<HdsDropdownSignature>;
        Select?: ComponentLike<HdsFormSelectBaseSignature>;
        TextInput?: ComponentLike<HdsFormTextInputBaseSignature>;
        Generic?: ComponentLike<HdsYieldSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

const HdsSegmentedGroup: TOC<HdsSegmentedGroupSignature> = <template>
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
