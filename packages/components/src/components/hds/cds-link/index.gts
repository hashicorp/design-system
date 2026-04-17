/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

import '@carbon/web-components/es/components/link/index.js';

type LinkSize = 'md' | 'sm' | 'lg';

export const CDS_LINK_SIZE_OPTIONS: LinkSize[] = ['md', 'sm', 'lg'];

export interface HdsCdsLinkSignature {
  Args: {
    disabled?: boolean;
    download?: string;
    href?: string;
    hreflang?: string;
    inline?: boolean;
    linkRole?: string;
    ping?: string;
    rel?: string;
    size?: LinkSize;
    target?: string;
    type?: string;
    visited?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: Element;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class HdsCdsLink extends Component<HdsCdsLinkSignature> {
  <template>
    <cds-link
      disabled={{@disabled}}
      download={{@download}}
      href={{@href}}
      hreflang={{@hreflang}}
      inline={{@inline}}
      link-role={{@linkRole}}
      ping={{@ping}}
      rel={{@rel}}
      size={{@size}}
      target={{@target}}
      type={{@type}}
      visited={{@visited}}
      ...attributes
    >
      {{yield}}
    </cds-link>
  </template>
}
