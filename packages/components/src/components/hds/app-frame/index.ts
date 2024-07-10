/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsAppFrameFooterSignature } from './parts/footer.ts';
import type { HdsAppFrameHeaderSignature } from './parts/header.ts';
import type { HdsAppFrameMainSignature } from './parts/main.ts';
import type { HdsAppFrameModalsSignature } from './parts/modals.ts';
import type { HdsAppFrameSidebarSignature } from './parts/sidebar.ts';
export interface HdsAppFrameSignature {
  Args: {
    hasFooter?: boolean;
    hasHeader?: boolean;
    hasMain?: boolean;
    hasModals?: boolean;
    hasSidebar?: boolean;
  };
  Blocks: {
    default: [
      {
        Footer?: ComponentLike<HdsAppFrameFooterSignature>;
        Header?: ComponentLike<HdsAppFrameHeaderSignature>;
        Main?: ComponentLike<HdsAppFrameMainSignature>;
        Modals?: ComponentLike<HdsAppFrameModalsSignature>;
        Sidebar?: ComponentLike<HdsAppFrameSidebarSignature>;
      },
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAppFrameComponent extends Component<HdsAppFrameSignature> {
  /**
   * Indicates if the "header" container should be displayed
   *
   * @param hasHeader
   * @type {boolean}
   * @default true
   */
  get hasHeader(): boolean {
    return this.args.hasHeader ?? true;
  }

  /**
   * Indicates if the "sidebar" container should be displayed
   *
   * @param hasSidebar
   * @type {boolean}
   * @default true
   */
  get hasSidebar(): boolean {
    return this.args.hasSidebar ?? true;
  }

  /**
   * Indicates if the "footer" container should be displayed
   *
   * @param hasFooter
   * @type {boolean}
   * @default true
   */
  get hasFooter(): boolean {
    return this.args.hasFooter ?? true;
  }

  /**
   * Indicates if the "modals" container should be displayed
   *
   * @param hasModals
   * @type {boolean}
   * @default true
   */
  get hasModals(): boolean {
    return this.args.hasModals ?? true;
  }
}
