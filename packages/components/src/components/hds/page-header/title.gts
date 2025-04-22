/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import HdsTextDisplay from '../text/display.gts';

import type { TOC } from '@ember/component/template-only';
import type { HdsTextDisplaySignature } from '../text/display.gts';

export interface HdsPageHeaderTitleSignature {
  Args: HdsTextDisplaySignature['Args'];
  Blocks: {
    default: [];
  };
  Element: HdsTextDisplaySignature['Element'];
}

const HdsPageHeaderTitle: TOC<HdsPageHeaderTitleSignature> = <template>
  <HdsTextDisplay
    class="hds-page-header__title"
    @tag="h1"
    @size="500"
    @color="strong"
    ...attributes
  >{{yield}}</HdsTextDisplay>
</template>;

export default HdsPageHeaderTitle;
