/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';

import HdsIcon from '../icon/index.gts';
import type { HdsIconSignature } from '../icon/index.gts';

interface HdsAppSideNavToggleButtonSignature {
  Args: {
    icon: HdsIconSignature['Args']['name'];
  };
  Element: HTMLButtonElement;
}

const HdsAppSideNavToggleButton: TemplateOnlyComponent<HdsAppSideNavToggleButtonSignature> = <template>
  <button class="hds-app-side-nav__toggle-button" type="button" ...attributes>
    <HdsIcon @name={{@icon}} />
  </button>
</template>;

export default HdsAppSideNavToggleButton;
