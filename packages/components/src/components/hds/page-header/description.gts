/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import HdsTextBody from '../text/body.gts';

import type { HdsTextBodySignature } from '../text/body.gts';

export interface HdsPageHeaderDescriptionSignature {
  Args: HdsTextBodySignature['Args'];
  Blocks: {
    default: [];
  };
  Element: HdsTextBodySignature['Element'];
}

const HdsPageHeaderDescription: TemplateOnlyComponent<HdsPageHeaderDescriptionSignature> =
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
