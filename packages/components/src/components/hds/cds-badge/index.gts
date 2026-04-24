/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

// Import the Carbon Web Component - this registers the custom element
import '@carbon/web-components/es/components/tag/index.js';

import {
  TAG_SIZE,
  TAG_TYPE,
} from '@carbon/web-components/es/components/tag/defs.js';

type TagSize = `${TAG_SIZE}`;
type TagType = `${TAG_TYPE}`;

export const CDS_BADGE_SIZE_OPTIONS = Object.values(TAG_SIZE);
export const CDS_BADGE_TYPE_OPTIONS = Object.values(TAG_TYPE);

export interface HdsCdsBadgeSignature {
  Args: {
    filter?: boolean;
    hasCustomIcon?: boolean;
    open?: boolean;
    size?: TagSize;
    title?: string;
    type?: TagType;
  };
  Blocks: {
    default: [];
  };
  Element: Element;
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class HdsCdsBadge extends Component<HdsCdsBadgeSignature> {
  // UNCOMMENT THIS IF YOU NEED A CONSTRUCTOR
  // constructor(owner: Owner, args: CdsBadgeSignature['Args']) {
  //   super(owner, args);
  //   // ADD YOUR ASSERTIONS HERE
  // }

  <template>
    <cds-tag
      filter={{@filter}}
      has-custom-icon={{@hasCustomIcon}}
      open={{@open}}
      size={{@size}}
      title={{@title}}
      type={{@type}}
      ...attributes
    >
      {{yield}}
    </cds-tag>
  </template>
}
