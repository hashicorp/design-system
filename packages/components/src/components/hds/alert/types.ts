/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import type { ComponentLike, WithBoundArgs } from '@glint/template';
import type HdsButtonIndexComponent from '../button';
import type HdsLinkStandaloneComponent from '../link/standalone';
import type { HdsYieldSignature } from '../yield/types';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDismiss?: (event: MouseEvent, ...args: any[]) => void;
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
