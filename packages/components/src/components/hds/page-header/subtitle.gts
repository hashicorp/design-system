/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import HdsTextBody from '../text/body.gts';

import type { HdsTextBodySignature } from '../text/body.gts';

export interface HdsPageHeaderSubtitleSignature {
  Args: HdsTextBodySignature['Args'];
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const HdsPageHeaderSubtitle: TemplateOnlyComponent<HdsPageHeaderSubtitleSignature> =
  <template>
    <HdsTextBody
      class="hds-page-header__subtitle"
      @tag="p"
      @size="200"
      @color="faint"
      ...attributes
    >{{yield}}</HdsTextBody>
  </template>;

export default HdsPageHeaderSubtitle;
