/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import type { TemplateOnlyComponent } from '@ember/component/template-only';
import Portal from 'ember-stargate/components/portal';

import HdsAppSideNavList from '../list/index.gts';

import type { HdsAppSideNavListSignature } from '../list/index.gts';

export interface HdsAppSideNavPortalSignature {
  Args: {
    ariaLabel?: string;
    targetName?: string;
  };
  Blocks: HdsAppSideNavListSignature['Blocks'];
  Element: HTMLDivElement;
}

const HdsAppSideNavPortal: TemplateOnlyComponent<HdsAppSideNavPortalSignature> =
  <template>
    <Portal
      @target={{if @targetName @targetName "hds-app-side-nav-portal-target"}}
    >
      <div class="hds-app-side-nav__content-panel" ...attributes>
        <HdsAppSideNavList aria-label={{@ariaLabel}} as |ListElements|>
          {{yield ListElements}}
        </HdsAppSideNavList>
      </div>
    </Portal>
  </template>;

export default HdsAppSideNavPortal;
