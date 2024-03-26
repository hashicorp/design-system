/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { HdsInteractiveSignature } from '../interactive/types.ts';

export enum HdsLinkIconPositionValues {
  Leading = 'leading',
  Trailing = 'trailing',
}

export type HdsLinkIconPositions = `${HdsLinkIconPositionValues}`;

export enum HdsLinkColorValues {
  Primary = 'primary',
  Secondary = 'secondary',
}

export type HdsLinkColors = `${HdsLinkColorValues}`;

export enum HdsLinkStandaloneSizeValues {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type HdsLinkStandaloneSizes = `${HdsLinkStandaloneSizeValues}`;

export interface HdsLinkStandaloneSignature {
  Args: HdsInteractiveSignature['Args'] & {
    icon: string;
    text: string;
    color?: HdsLinkColors;
    href?: string;
    iconPosition?: HdsLinkIconPositions;
    isHrefExternal?: boolean;
    isRouteExternal?: boolean;
    size?: HdsLinkStandaloneSizes;
  };
  Element: HdsInteractiveSignature['Element'];
}

export interface HdsLinkInlineSignature {
  Args: HdsInteractiveSignature['Args'] & {
    color?: HdsLinkColors;
    href?: string;
    icon?: string;
    iconPosition?: HdsLinkIconPositions;
    isHrefExternal?: boolean;
    isRouteExternal?: boolean;
  };
  Blocks: {
    default: [];
  };
  Element: HdsInteractiveSignature['Element'];
}
