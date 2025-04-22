/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import HdsTextBody from '../text/body.gts';

import type { TOC } from '@ember/component/template-only';
import type { HdsTextBodySignature } from '../text/body.gts';

export interface HdsPageHeaderDescriptionSignature {
  Args: HdsTextBodySignature['Args'];
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const HdsPageHeaderDescription: TOC<HdsPageHeaderDescriptionSignature> =
  <template>
    <HdsTextBody
      class="hds-page-header__description"
      @tag="p"
      @size="200"
      @color="primary"
      ...attributes
    >{{yield}}</HdsTextBody>
  </template>;

export default HdsPageHeaderDescription;
