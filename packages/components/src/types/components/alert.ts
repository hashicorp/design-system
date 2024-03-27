/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type HdsButtonIndexComponent from '../../components/hds/button';
import type HdsLinkStandaloneComponent from '../../components/hds/link/standalone';
import type { HdsYieldSignature } from './yield';

export enum HdsAlertTypeValues {
  Page = 'page',
  Inlne = 'inline',
  Compact = 'compact',
}
export type HdsAlertTypes = `${HdsAlertTypeValues}`;

export enum HdsAlertColorValues {
  Neutral = 'neutral',
  Highlight = 'highlight',
  Success = 'success',
  Warning = 'warning',
  Critical = 'critical',
}
export type HdsAlertColors = `${HdsAlertColorValues}`;

export interface HdsAlertSignature {
  Args: {
    type: HdsAlertTypes;
    color?: HdsAlertColors;
    icon?: string | false;
    onDismiss?: () => void;
  };
  Blocks: {
    default: [
      {
        Title?: ComponentLike<HdsAlertTitleSignature>;
        Description?: ComponentLike<HdsAlertDescriptionSignature>;
        Generic?: ComponentLike<HdsYieldSignature>;
        LinkStandalone?: WithBoundArgs<
          typeof HdsLinkStandaloneComponent,
          'size'
        >;
        Button?: WithBoundArgs<typeof HdsButtonIndexComponent, 'size'>;
      }
    ];
  };
  Element: HTMLDivElement;
}

export interface HdsAlertDescriptionSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export interface HdsAlertTitleSignature {
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}
