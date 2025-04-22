/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Portal from 'ember-stargate/components/portal';
import HdsSideNavList from '../list/index.gts';

import type { TOC } from '@ember/component/template-only';
import type { HdsSideNavListSignature } from '../list/index.gts';

export interface HdsSideNavPortalSignature {
  Args: {
    ariaLabel?: string;
    targetName?: string;
  };
  Blocks: HdsSideNavListSignature['Blocks'];
  Element: HTMLDivElement;
}

const HdsSideNavPortal: TOC<HdsSideNavPortalSignature> = <template>
  <Portal @target={{if @targetName @targetName "hds-side-nav-portal-target"}}>
    <div class="hds-side-nav__content-panel" ...attributes>
      <HdsSideNavList aria-label={{@ariaLabel}} as |ListElements|>
        {{yield ListElements}}
      </HdsSideNavList>
    </div>
  </Portal>
</template>;

export default HdsSideNavPortal;
