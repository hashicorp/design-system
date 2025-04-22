/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import HdsTextBody from '../text/body.gts';

import type { TOC } from '@ember/component/template-only';
import type { HdsTextBodySignature } from '../text/body.gts';

export interface HdsPageHeaderSubtitleSignature {
  Args: HdsTextBodySignature['Args'];
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const HdsPageHeaderSubtitle: TOC<HdsPageHeaderSubtitleSignature> = <template>
  <HdsTextBody
    class="hds-page-header__subtitle"
    @tag="p"
    @size="200"
    @color="faint"
    ...attributes
  >{{yield}}</HdsTextBody>
</template>;

export default HdsPageHeaderSubtitle;
