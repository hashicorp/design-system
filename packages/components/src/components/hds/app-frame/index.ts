/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import type { ComponentLike } from '@glint/template';
import type { HdsAppFrameFooterSignature } from './parts/footer.ts';
import type { HdsAppFrameHeaderSignature } from './parts/header.ts';
import type { HdsAppFrameModalsSignature } from './parts/modals.ts';
import type { HdsAppFrameSidebarSignature } from './parts/sidebar.ts';
import type { HdsAppFrameMainSignature } from './parts/main.ts';

export interface HdsAppFrameIndexSignature {
  Args: {
    hasHeader?: boolean;
    hasSidebar?: boolean;
    hasFooter?: boolean;
    hasModals?: boolean;
    hasMain?: boolean;
  };
  Blocks: {
    default: [
      {
        Header?: ComponentLike<HdsAppFrameHeaderSignature>;
        Sidebar?: ComponentLike<HdsAppFrameSidebarSignature>;
        Footer?: ComponentLike<HdsAppFrameFooterSignature>;
        Modals?: ComponentLike<HdsAppFrameModalsSignature>;
        Main?: ComponentLike<HdsAppFrameMainSignature>;
      }
    ];
  };
  Element: HTMLDivElement;
}

export default class HdsAppFrameIndexComponent extends Component<HdsAppFrameIndexSignature> {
  /**
   * Indicates if the "header" container should be displayed
   *
   * @param hasHeader
   * @type {boolean}
   * @default true
   */
  get hasHeader() {
    return this.args.hasHeader ?? true;
  }

  /**
   * Indicates if the "sidebar" container should be displayed
   *
   * @param hasSidebar
   * @type {boolean}
   * @default true
   */
  get hasSidebar() {
    return this.args.hasSidebar ?? true;
  }

  /**
   * Indicates if the "footer" container should be displayed
   *
   * @param hasFooter
   * @type {boolean}
   * @default true
   */
  get hasFooter() {
    return this.args.hasFooter ?? true;
  }

  /**
   * Indicates if the "modals" container should be displayed
   *
   * @param hasModals
   * @type {boolean}
   * @default true
   */
  get hasModals() {
    return this.args.hasModals ?? true;
  }
}
