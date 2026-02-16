/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import { hash } from '@ember/helper';

import type { WithBoundArgs } from '@glint/template';

import HdsFormHeaderTitle from '../header/title.gts';
import HdsFormHeaderDescription from '../header/description.gts';

export interface HdsFormSectionHeaderSignature {
  Blocks: {
    default: [
      {
        Title?: WithBoundArgs<typeof HdsFormHeaderTitle, 'size'>;
        Description?: typeof HdsFormHeaderDescription;
      },
    ];
  };
  Element: HTMLDivElement;
}
const HdsFormSectionHeader: TemplateOnlyComponent<HdsFormSectionHeaderSignature> =
  <template>
    <div class="hds-form__section-header" ...attributes>
      {{yield
        (hash
          Title=(component HdsFormHeaderTitle size="300")
          Description=HdsFormHeaderDescription
        )
      }}
    </div>
  </template>;

export default HdsFormSectionHeader;
