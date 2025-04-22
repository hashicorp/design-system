/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */
import Portal from 'ember-stargate/components/portal';

import HdsAppSideNavList from '../list/index.gts';

import type { TOC } from '@ember/component/template-only';
import type { HdsAppSideNavListSignature } from '../list/index.gts';

// TODO! understand how this should be done "correctly"
// import type { PortalSignature } from 'ember-stargate/components/portal';
interface PortalSignature {
  Args: {
    target: string;
    renderInPlace?: boolean;
    fallback?: 'inplace';
  };
  Blocks: {
    default: [];
  };
}

export interface HdsAppSideNavPortalSignature {
  Args: PortalSignature['Args'] & {
    ariaLabel?: string;
    targetName?: string;
  };
  Blocks: HdsAppSideNavListSignature['Blocks'];
  Element: HTMLDivElement;
}

const HdsAppSideNavPortal: TOC<HdsAppSideNavPortalSignature> = <template>
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
